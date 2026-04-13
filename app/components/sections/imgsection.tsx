"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const config = {
  symbols: ["O", "x", "*", ">", "$", "W"],
  blockSize: 25,
  detectionRadius: 50,
  clusterSize: 7,
  blockLifetime: 300,
  emptyRatio: 0.3,
  scrambleRatio: 0.25,
  scrambleInterval: 150,
};
function getRandomSymbol() {
  return config.symbols[Math.floor(Math.random() * config.symbols.length)];
}

function initGridOverlay(element: HTMLElement) {
  // Prevent duplicate overlays in Strict Mode
  if (element.querySelector(".grid-overlay")) return () => {};

  const gridOverlay = document.createElement("div");
  gridOverlay.className = "grid-overlay";

  const width = element.offsetWidth;
  const height = element.offsetHeight;

  const cols = Math.ceil(width / config.blockSize);
  const rows = Math.ceil(height / config.blockSize);
  const blocks = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const block = document.createElement("div");
      block.className = "grid-block";
      const isEmpty = Math.random() < config.emptyRatio;
      block.textContent = isEmpty ? "" : getRandomSymbol();

      block.style.width = `${config.blockSize}px`;
      block.style.height = `${config.blockSize}px`;
      block.style.left = `${col * config.blockSize}px`;
      block.style.top = `${row * config.blockSize}px`;
      gridOverlay.appendChild(block);

      blocks.push({
        element: block,
        x: col * config.blockSize + config.blockSize / 2,
        y: row * config.blockSize + config.blockSize / 2,
        gridX: col,
        gridY: row,
        highlightedEndTime: 0,
        isEmpty: isEmpty,
        shouldScramble: !isEmpty && Math.random() < config.scrambleRatio,
        scrambleInterval: null,
      });
    }
  }
  element.appendChild(gridOverlay);
  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let closesetBlock: any = null;
    let closestDistance = Infinity;
    for (const block of blocks) {
      const dx = mouseX - block.x;
      const dy = mouseY - block.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < closestDistance) {
        closestDistance = distance;
        closesetBlock = block;
      }
    }

    if (!closesetBlock || closestDistance > config.detectionRadius) return;

    const currentTime = Date.now();
    closesetBlock.element.classList.add("active");
    closesetBlock.highlightedEndTime = currentTime + config.blockLifetime;

    if (closesetBlock.shouldScramble && !closesetBlock.scrambleInterval) {
      closesetBlock.scrambleInterval = setInterval(() => {
        closesetBlock.element.textContent = getRandomSymbol();
      }, config.scrambleInterval);
    }

    const clusterCount = Math.floor(Math.random() * config.clusterSize) + 1;
    let currentBlock = closesetBlock;
    const activeBlocks = [closesetBlock];
    for (let i = 0; i < clusterCount; i++) {
      const neighbours = blocks.filter((neighbour) => {
        if (activeBlocks.includes(neighbour)) return false;
        const dx = Math.abs(neighbour.gridX - currentBlock.gridX);
        const dy = Math.abs(neighbour.gridY - currentBlock.gridY);
        return dx <= 1 && dy <= 1;
      });
      if (neighbours.length === 0) break;

      const randomNeighbour =
        neighbours[Math.floor(Math.random() * neighbours.length)];
      randomNeighbour.element.classList.add("active");
      randomNeighbour.highlightedEndTime =
        currentTime + config.blockLifetime + i * 10;

      if (randomNeighbour.shouldScramble && !randomNeighbour.scrambleInterval) {
        randomNeighbour.scrambleInterval = setInterval(() => {
          randomNeighbour.element.textContent = getRandomSymbol();
        }, config.scrambleInterval);
      }
      activeBlocks.push(randomNeighbour);
      currentBlock = randomNeighbour;
    }
  };

  element.addEventListener("mousemove", handleMouseMove as EventListener);

  let animationFrameId: number;
  function updateHighlightens() {
    const currentTime = Date.now();

    blocks.forEach((block) => {
      if (
        block.highlightedEndTime > 0 &&
        currentTime > block.highlightedEndTime
      ) {
        block.element.classList.remove("active");
        block.highlightedEndTime = 0;

        if (block.scrambleInterval) {
          clearInterval(block.scrambleInterval);
          block.scrambleInterval = null;
          if (!block.isEmpty) {
            block.element.textContent = getRandomSymbol();
          }
        }
      }
    });

    animationFrameId = requestAnimationFrame(updateHighlightens);
  }
  updateHighlightens();

  return () => {
    element.removeEventListener("mousemove", handleMouseMove as EventListener);
    cancelAnimationFrame(animationFrameId);
    blocks.forEach((b) => {
      if (b.scrambleInterval) clearInterval(b.scrambleInterval);
    });
    gridOverlay.remove();
  };
}

export default function ImgSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initGridOverlay(containerRef.current);
    return cleanup;
  }, []);
  return (
    <section className="container">
      <style>
        {`
          .container {
            position: relative;
            width: 100%;
            height: 100svh;
          }

          .hover-img {
            position: relative;
            height: 100%;
            width: 100%;
            overflow: hidden;
          }

          .grid-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
          }

          .grid-block {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #1a1a1a;
            color: white;
            font-family: monospace;
            font-size: 20px;
            font-weight: 400;
            opacity: 0;
          }
          .grid-block.active {
            opacity: 1;
          }
        `}
      </style>

      <div ref={containerRef} className="hover-img">
        <Image
          src="/demo.png"
          sizes="100vw"
          fill
          alt="hover-image"
          className="object-cover"
        />
      </div>
    </section>
  );
}
