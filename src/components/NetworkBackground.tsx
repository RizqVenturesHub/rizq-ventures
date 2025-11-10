// components/NetworkBackground.tsx
import React, { useEffect, useRef, useState } from 'react';

interface NetworkBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMouseInsideRef = useRef(false);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class with canvas dimensions passed as parameters
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      canvasWidth: number;
      canvasHeight: number;

      constructor(x: number, y: number, canvasWidth: number, canvasHeight: number) {
        this.x = x;
        this.y = y;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        // Alternate between green and blue particles
        this.color = Math.random() > 0.5 ? '#39B54A' : '#215BB8';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x > this.canvasWidth || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > this.canvasHeight || this.y < 0) {
          this.speedY = -this.speedY;
        }

        // Mouse interaction - repulsion effect
        if (isMouseInsideRef.current && mousePositionRef.current.x && mousePositionRef.current.y) {
          const dx = mousePositionRef.current.x - this.x;
          const dy = mousePositionRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const mouseRadius = 150;

          if (distance < mouseRadius) {
            const forceX = dx / distance;
            const forceY = dy / distance;
            const force = (mouseRadius - distance) / mouseRadius;

            // Push particles away from mouse
            this.x -= forceX * force * 2;
            this.y -= forceY * force * 2;
          }
        }
      }


      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      particles.push(new Particle(x, y, canvas.width, canvas.height));
    }

    // Connect particles function
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(57, 181, 74, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      connectParticles();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // Track exact mouse position relative to canvas
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    mousePositionRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top + scrollTop,
    };
  };
  const handleMouseEnter = () => {
    isMouseInsideRef.current = true;
  };

  const handleMouseLeave = () => {
    isMouseInsideRef.current = false;
  };


  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'linear-gradient(135deg, rgba(196, 233, 201, 0.5) 0%, rgba(136, 211, 146, 0.7) 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default NetworkBackground;
