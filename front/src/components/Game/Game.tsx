import React, { useEffect, useState } from "react";

interface Position {
  x: number;
  y: number;
}

class Player {
  position: Position;
  width: number;
  height: number;
  baseSpeed: number;
  jumpSpeed: number;
  gravity: number;
  isJumping: boolean;
  initialY: number;
  velocityY: number;

  constructor() {
    this.position = { x: window.innerWidth / 2, y: window.innerHeight - 50 };
    this.width = 50;
    this.height = 50;
    this.baseSpeed = 5;
    this.jumpSpeed = -15;
    this.gravity = 0.8;
    this.isJumping = false;
    this.initialY = window.innerHeight - 50;
    this.velocityY = 0;
  }

  moveLeft(isKeyPressed: boolean) {
    const currentSpeed = isKeyPressed ? this.baseSpeed * 2 : this.baseSpeed;
    if (this.position.x > 0) {
      this.position.x -= currentSpeed;
    }
  }

  moveRight(isKeyPressed: boolean) {
    const currentSpeed = isKeyPressed ? this.baseSpeed * 2 : this.baseSpeed;
    if (this.position.x < window.innerWidth - this.width) {
      this.position.x += currentSpeed;
    }
  }

  jump() {
    if (!this.isJumping) {
      this.isJumping = true;
      this.velocityY = this.jumpSpeed;
    }
  }

  update() {
    if (this.isJumping) {
      this.velocityY += this.gravity;
      this.position.y += this.velocityY;

      // Check if player has landed
      if (this.position.y >= this.initialY) {
        this.position.y = this.initialY;
        this.isJumping = false;
        this.velocityY = 0;
      }
    }
  }
}

const Game: React.FC = () => {
  const [player] = useState<Player>(new Player());
  const [, forceUpdate] = useState({});
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

  useEffect(() => {
    let animationFrameId: number;

    const gameLoop = () => {
      player.update();
      forceUpdate({});
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKeys((prev) => new Set(prev).add(e.key));

      if (e.key === "Alt") {
        e.preventDefault();
        player.jump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setPressedKeys((prev) => {
        const newKeys = new Set(prev);
        newKeys.delete(e.key);
        return newKeys;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [player]);

  useEffect(() => {
    if (pressedKeys.has("ArrowLeft")) {
      player.moveLeft(true);
    }
    if (pressedKeys.has("ArrowRight")) {
      player.moveRight(true);
    }
  }, [pressedKeys, player]);

  return (
    <div
      className="w-screen h-screen bg-black relative overflow-hidden"
      style={{ cursor: "none" }}
    >
      <div
        className="absolute bg-red-500"
        style={{
          left: `${player.position.x}px`,
          top: `${player.position.y}px`,
          width: `${player.width}px`,
          height: `${player.height}px`,
          transition: "left 0.05s linear",
        }}
      />
    </div>
  );
};

export default Game;
