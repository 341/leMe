import Matter from "matter-js";
import type { ParticleConfig } from "@/types";

const { Engine, Runner, Bodies, Body, Composite, Events } = Matter;

export interface ParticleBody extends Matter.Body {
  plugin: {
    label: string;
    color: string;
    radius: number;
    glowIntensity: number;
  };
}

export interface EngineOptions {
  width: number;
  height: number;
  particles: ParticleConfig[];
  onReady?: () => void;
}

export class ParticleEngine {
  private engine: Matter.Engine;
  private runner: Matter.Runner | null = null;
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;
  private animationFrame: number | null = null;
  private disposed = false;
  private pointer = { x: 0, y: 0, active: false };
  private attractorStrength = 0.0008;
  private repulsorRadius = 120;

  constructor(canvas: HTMLCanvasElement, options: EngineOptions) {
    this.canvas = canvas;
    this.width = options.width;
    this.height = options.height;

    this.engine = Engine.create({
      gravity: { x: 0, y: 0.15, scale: 0.001 },
    });

    this.setupWorld(options.particles);
    this.setupPointerEvents();
    this.startCustomRender();
    options.onReady?.();
  }

  private setupWorld(particles: ParticleConfig[]) {
    const wallThickness = 60;
    const walls = [
      Bodies.rectangle(this.width / 2, -wallThickness / 2, this.width, wallThickness, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(
        this.width / 2,
        this.height + wallThickness / 2,
        this.width,
        wallThickness,
        { isStatic: true, render: { visible: false } },
      ),
      Bodies.rectangle(-wallThickness / 2, this.height / 2, wallThickness, this.height, {
        isStatic: true,
        render: { visible: false },
      }),
      Bodies.rectangle(
        this.width + wallThickness / 2,
        this.height / 2,
        wallThickness,
        this.height,
        { isStatic: true, render: { visible: false },
      }),
    ];

    const bodies: ParticleBody[] = particles.map((p, i) => {
      const angle = (i / particles.length) * Math.PI * 2;
      const spread = Math.min(this.width, this.height) * 0.3;
      const x = this.width / 2 + Math.cos(angle) * spread * (0.5 + Math.random() * 0.5);
      const y = this.height / 2 + Math.sin(angle) * spread * (0.5 + Math.random() * 0.5);

      const body = Bodies.circle(x, y, p.radius, {
        restitution: 0.85,
        friction: 0.02,
        frictionAir: 0.015,
        density: p.mass * 0.001,
        label: p.label,
      }) as ParticleBody;

      body.plugin = {
        label: p.label,
        color: p.color,
        radius: p.radius,
        glowIntensity: 0.6 + Math.random() * 0.4,
      };

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
      });

      return body;
    });

    Composite.add(this.engine.world, [...walls, ...bodies]);

    Events.on(this.engine, "beforeUpdate", () => {
      if (!this.pointer.active) return;

      bodies.forEach((body) => {
        const dx = body.position.x - this.pointer.x;
        const dy = body.position.y - this.pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.repulsorRadius && dist > 1) {
          const force = (1 - dist / this.repulsorRadius) * 0.003;
          Body.applyForce(body, body.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          });
        } else if (dist > this.repulsorRadius * 1.5) {
          const force = this.attractorStrength;
          Body.applyForce(body, body.position, {
            x: (-dx / dist) * force,
            y: (-dy / dist) * force,
          });
        }
      });
    });

    Events.on(this.engine, "collisionStart", (event) => {
      event.pairs.forEach((pair) => {
        const a = pair.bodyA as ParticleBody;
        const b = pair.bodyB as ParticleBody;
        if (a.plugin) a.plugin.glowIntensity = 1;
        if (b.plugin) b.plugin.glowIntensity = 1;
      });
    });
  }

  private setupPointerEvents() {
    const onMove = (e: PointerEvent) => {
      const rect = this.canvas.getBoundingClientRect();
      this.pointer.x = ((e.clientX - rect.left) / rect.width) * this.width;
      this.pointer.y = ((e.clientY - rect.top) / rect.height) * this.height;
      this.pointer.active = true;
    };

    const onLeave = () => {
      this.pointer.active = false;
    };

    this.canvas.addEventListener("pointermove", onMove);
    this.canvas.addEventListener("pointerdown", onMove);
    this.canvas.addEventListener("pointerleave", onLeave);
    this.canvas.addEventListener("pointerup", onLeave);

    this.cleanupPointer = () => {
      this.canvas.removeEventListener("pointermove", onMove);
      this.canvas.removeEventListener("pointerdown", onMove);
      this.canvas.removeEventListener("pointerleave", onLeave);
      this.canvas.removeEventListener("pointerup", onLeave);
    };
  }

  private cleanupPointer: (() => void) | null = null;

  private startCustomRender() {
    const ctx = this.canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    ctx.scale(dpr, dpr);

    this.runner = Runner.create();
    Runner.run(this.runner, this.engine);

    const render = () => {
      if (this.disposed) return;

      ctx.clearRect(0, 0, this.width, this.height);

      if (this.pointer.active) {
        const gradient = ctx.createRadialGradient(
          this.pointer.x,
          this.pointer.y,
          0,
          this.pointer.x,
          this.pointer.y,
          this.repulsorRadius,
        );
        gradient.addColorStop(0, "rgba(139, 92, 246, 0.15)");
        gradient.addColorStop(0.5, "rgba(0, 229, 255, 0.08)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);
      }

      const bodies = Composite.allBodies(this.engine.world).filter(
        (b) => !b.isStatic,
      ) as ParticleBody[];

      bodies.forEach((body) => {
        if (!body.plugin) return;

        const { x, y } = body.position;
        const { color, label, radius, glowIntensity } = body.plugin;

        body.plugin.glowIntensity += (0.6 - body.plugin.glowIntensity) * 0.05;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);

        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 2);
        glow.addColorStop(0, `${color}${Math.floor(glowIntensity * 60).toString(16).padStart(2, "0")}`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 2, 0, Math.PI * 2);
        ctx.fill();

        const ballGradient = ctx.createRadialGradient(
          -radius * 0.3,
          -radius * 0.3,
          0,
          0,
          0,
          radius,
        );
        ballGradient.addColorStop(0, lighten(color, 40));
        ballGradient.addColorStop(0.7, color);
        ballGradient.addColorStop(1, darken(color, 30));

        ctx.fillStyle = ballGradient;
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `${color}66`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = "#f4f4f8";
        ctx.font = `600 ${Math.max(10, radius * 0.55)}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, 0, 0);

        ctx.restore();
      });

      this.drawConnections(ctx, bodies);

      this.animationFrame = requestAnimationFrame(render);
    };

    render();
  }

  private drawConnections(ctx: CanvasRenderingContext2D, bodies: ParticleBody[]) {
    const maxDist = 180;

    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i];
        const b = bodies[j];
        const dx = a.position.x - b.position.x;
        const dy = a.position.y - b.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.25;
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.position.x, a.position.y);
          ctx.lineTo(b.position.x, b.position.y);
          ctx.stroke();
        }
      }
    }
  }

  resize(width: number, height: number) {
    this.width = width;
    this.height = height;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;

    const ctx = this.canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const bodies = Composite.allBodies(this.engine.world);
    const staticBodies = bodies.filter((b) => b.isStatic);
    Composite.remove(this.engine.world, staticBodies);

    const wallThickness = 60;
    const walls = [
      Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, {
        isStatic: true,
      }),
      Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, {
        isStatic: true,
      }),
      Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
      }),
      Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, {
        isStatic: true,
      }),
    ];
    Composite.add(this.engine.world, walls);
  }

  dispose() {
    this.disposed = true;
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    if (this.runner) Runner.stop(this.runner);
    if (this.cleanupPointer) this.cleanupPointer();
    Engine.clear(this.engine);
  }
}

function lighten(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `rgb(${r},${g},${b})`;
}

function darken(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `rgb(${r},${g},${b})`;
}
