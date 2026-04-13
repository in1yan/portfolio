"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

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
  if (element.querySelector(".grid-overlay")) return () => {};

  const gridOverlay = document.createElement("div");
  gridOverlay.className = "grid-overlay";

  const width = element.offsetWidth;
  const height = element.offsetHeight;

  const cols = Math.ceil(width / config.blockSize);
  const rows = Math.ceil(height / config.blockSize);

  // Use a 2D array for O(1) fast lookups
  const blocks: any[][] = [];
  const flatBlocks: any[] = [];

  // Use a Set to track ONLY currently active blocks for the animation loop
  const activeBlocksSet = new Set<any>();

  for (let row = 0; row < rows; row++) {
    blocks[row] = [];
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

      const blockData = {
        element: block,
        gridX: col,
        gridY: row,
        highlightedEndTime: 0,
        isEmpty: isEmpty,
        shouldScramble: !isEmpty && Math.random() < config.scrambleRatio,
        scrambleInterval: null as ReturnType<typeof setInterval> | null,
      };

      blocks[row][col] = blockData;
      flatBlocks.push(blockData);
    }
  }
  element.appendChild(gridOverlay);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // PERFORMANCE FIX 1: O(1) Lookup instead of looping 3,500 elements
    const col = Math.floor(mouseX / config.blockSize);
    const row = Math.floor(mouseY / config.blockSize);

    // Ensure we are within bounds
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;

    const closestBlock = blocks[row][col];
    if (!closestBlock) return;

    const currentTime = Date.now();
    closestBlock.element.classList.add("active");
    closestBlock.highlightedEndTime = currentTime + config.blockLifetime;
    activeBlocksSet.add(closestBlock); // Add to our fast tracking set

    if (closestBlock.shouldScramble && !closestBlock.scrambleInterval) {
      closestBlock.scrambleInterval = setInterval(() => {
        closestBlock.element.textContent = getRandomSymbol();
      }, config.scrambleInterval);
    }

    const clusterCount = Math.floor(Math.random() * config.clusterSize) + 1;
    let currentBlock = closestBlock;

    for (let i = 0; i < clusterCount; i++) {
      const neighbors = [];

      // O(1) Check immediate neighbors instead of filtering the entire grid
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue; // Skip self

          const r = currentBlock.gridY + dy;
          const c = currentBlock.gridX + dx;

          // Check bounds and if it's already active
          if (r >= 0 && r < rows && c >= 0 && c < cols) {
            const neighbor = blocks[r][c];
            if (!activeBlocksSet.has(neighbor)) {
              neighbors.push(neighbor);
            }
          }
        }
      }

      if (neighbors.length === 0) break;

      const randomNeighbor =
        neighbors[Math.floor(Math.random() * neighbors.length)];
      randomNeighbor.element.classList.add("active");
      randomNeighbor.highlightedEndTime =
        currentTime + config.blockLifetime + i * 10;

      if (randomNeighbor.shouldScramble && !randomNeighbor.scrambleInterval) {
        randomNeighbor.scrambleInterval = setInterval(() => {
          randomNeighbor.element.textContent = getRandomSymbol();
        }, config.scrambleInterval);
      }

      activeBlocksSet.add(randomNeighbor);
      currentBlock = randomNeighbor;
    }
  };

  element.addEventListener("mousemove", handleMouseMove as EventListener);

  let animationFrameId: number;
  function updateHighlights() {
    const currentTime = Date.now();

    // PERFORMANCE FIX 2: Only iterate over active blocks (usually < 20) instead of all 3,500 blocks every frame!
    activeBlocksSet.forEach((block) => {
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

        // Remove from the active set to keep the loop lightning fast
        activeBlocksSet.delete(block);
      }
    });

    animationFrameId = requestAnimationFrame(updateHighlights);
  }
  updateHighlights();

  return () => {
    element.removeEventListener("mousemove", handleMouseMove as EventListener);
    cancelAnimationFrame(animationFrameId);
    flatBlocks.forEach((b) => {
      if (b.scrambleInterval) clearInterval(b.scrambleInterval);
    });
    gridOverlay.remove();
  };
}

interface ScrambleImageProps {
  imageSrc: string;
  altText: string;
}

export default function ScrambleImage({ imageSrc, altText }: ScrambleImageProps) {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageContainerRef.current) return;
    const cleanup = initGridOverlay(imageContainerRef.current);
    return cleanup;
  }, []);

  return (
    <>
      <style>
        {`
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
            transition: opacity 0.1s ease-out;
          }
          .grid-block.active {
            opacity: 1;
          }
        `}
      </style>

      {/* Image container that receives the mouse events and grid overlay */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="100vw"
          className="object-cover grayscale-[20%]"
        />
      </div>
    </>
  );
}
