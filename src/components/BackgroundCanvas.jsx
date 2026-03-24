import React, { useEffect, useRef } from 'react';

const BackgroundCanvas = ({ isDarkMode }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const colors = isDarkMode ? {
      particle: 'rgba(0, 191, 255, 0.8)',
      line: 'rgba(0, 191, 255, 0.2)',
      glow: 'rgba(0, 255, 255, 0.4)',
      bg: '#05050a'
    } : {
      particle: 'rgba(91, 95, 239, 0.6)',
      line: 'rgba(91, 95, 239, 0.1)',
      glow: 'rgba(91, 95, 239, 0.2)',
      bg: '#f8f9ff'
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        // Faster movement
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
        // Removed expensive shadowBlur for performance
      }
    }

    const initParticles = () => {
      // Lower particle count for maximum performance
      const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 80);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      const maxDistance = 110;
      const maxDistanceSq = maxDistance * maxDistance;

      ctx.beginPath();
      ctx.strokeStyle = isDarkMode ? 'rgba(0, 191, 255, 0.15)' : 'rgba(91, 95, 239, 0.1)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      ctx.stroke();
    };

    const drawStreams = () => {
      // Increased count and length for 'long lining' effect
      const streamCount = 12;
      const time = Date.now() * 0.001;

      for (let i = 0; i < streamCount; i++) {
        ctx.beginPath();
        const y = (Math.sin(time * 0.4 + i * 2) * 0.45 + 0.5) * canvas.height;
        // Faster and longer rays
        const xOffset = (time * 180 + i * 400) % (canvas.width + 2000) - 1000;

        const gradient = ctx.createLinearGradient(xOffset, y, xOffset + 1500, y);
        const color = isDarkMode ? 'rgba(0, 191, 255,' : 'rgba(91, 95, 239,';
        gradient.addColorStop(0, `${color} 0)`);
        gradient.addColorStop(0.5, `${color} 0.5)`);
        gradient.addColorStop(1, `${color} 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.moveTo(xOffset, y);
        ctx.lineTo(xOffset + 1500, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: isDarkMode ? '#05050a' : '#f8f9ff',
        transition: 'background 0.5s ease'
      }}
    />
  );
};

export default BackgroundCanvas;
