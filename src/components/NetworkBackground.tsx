// components/NetworkBackground.tsx
import React, { useEffect, useRef, useState } from 'react';

interface NetworkBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const NetworkBackground: React.FC<NetworkBackgroundProps> = ({ children, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    // Network nodes
    const nodes: Array<{ x: number; y: number; vx: number; vy: number }> = [];
    const nodeCount = 50;
    const connectionDistance = 150;

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, // Reduced speed
        vy: (Math.random() - 0.5) * 0.3, // Reduced speed
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        // Draw connections between nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - node.x;
          const dy = nodes[j].y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / connectionDistance})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Connect to mouse (only draw lines, don't move nodes)
        const mouseDistance = Math.sqrt(
          Math.pow(mousePositionRef.current.x - node.x, 2) + 
          Math.pow(mousePositionRef.current.y - node.y, 2)
        );
        
        if (mouseDistance < connectionDistance * 1.5) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mousePositionRef.current.x, mousePositionRef.current.y);
          ctx.strokeStyle = `rgba(57, 181, 74, ${1 - mouseDistance / (connectionDistance * 1.5)})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []); // Remove mousePosition dependency

  // Track mouse position with smoother updates
  const handleMouseMove = (e: React.MouseEvent) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    // Smooth interpolation for mouse position
    mousePositionRef.current = {
      x: mousePositionRef.current.x + (newX - mousePositionRef.current.x) * 0.1,
      y: mousePositionRef.current.y + (newY - mousePositionRef.current.y) * 0.1,
    };
    
    setMousePosition({ x: newX, y: newY });
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
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
