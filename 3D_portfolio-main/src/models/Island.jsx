/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import { a } from "@react-spring/three";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import islandScene from "../assets/3d/island.glb";

export function Island({
  isRotating,
  setIsRotating,
  setCurrentStage,
  currentFocusPoint,
  ...props
}) {
  const islandRef = useRef();
  // Get access to the Three.js renderer and viewport
  const { gl, viewport } = useThree();
  const { nodes, materials } = useGLTF(islandScene);

  // Use a ref for the last mouse x position
  const lastX = useRef(0);
  // Use a ref for rotation speed
  const rotationSpeed = useRef(0);
  // Define a damping factor to control rotation damping
  const dampingFactor = 0.95;

  // Handle pointer (mouse or touch) down event
  const handlePointerDown = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(true);

    // Calculate the clientX based on whether it's a touch event or a mouse event
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;

    // Store the current clientX position for reference
    lastX.current = clientX;
  };

  // Handle pointer (mouse or touch) up event
  const handlePointerUp = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsRotating(false);
  };

  // Handle pointer (mouse or touch) move event
  const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      islandRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  // Handle keydown events
  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y += 0.005 * Math.PI;
      rotationSpeed.current = 0.007;
    } else if (event.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);

      islandRef.current.rotation.y -= 0.005 * Math.PI;
      rotationSpeed.current = -0.007;
    }
  };

  // Handle keyup events
  const handleKeyUp = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      setIsRotating(false);
    }
  };

  useEffect(() => {
    // Add event listeners for pointer and keyboard events
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Remove event listeners when component unmounts
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  // This function is called on each frame update
  useFrame(() => {
    // If not rotating, apply damping to slow down the rotation (smoothly)
    if (!isRotating) {
      // Apply damping factor
      rotationSpeed.current *= dampingFactor;

      // Stop rotation when speed is very small
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }

      islandRef.current.rotation.y += rotationSpeed.current;
    } else {
      // When rotating, determine the current stage based on island's orientation
      const rotation = islandRef.current.rotation.y;

      /**
       * Normalize the rotation value to ensure it stays within the range [0, 2 * Math.PI].
       * The goal is to ensure that the rotation value remains within a specific range to
       * prevent potential issues with very large or negative rotation values.
       *  Here's a step-by-step explanation of what this code does:
       *  1. rotation % (2 * Math.PI) calculates the remainder of the rotation value when divided
       *     by 2 * Math.PI. This essentially wraps the rotation value around once it reaches a
       *     full circle (360 degrees) so that it stays within the range of 0 to 2 * Math.PI.
       *  2. (rotation % (2 * Math.PI)) + 2 * Math.PI adds 2 * Math.PI to the result from step 1.
       *     This is done to ensure that the value remains positive and within the range of
       *     0 to 2 * Math.PI even if it was negative after the modulo operation in step 1.
       *  3. Finally, ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) applies another
       *     modulo operation to the value obtained in step 2. This step guarantees that the value
       *     always stays within the range of 0 to 2 * Math.PI, which is equivalent to a full
       *     circle in radians.
       */
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });

  return (
    <a.group ref={islandRef} {...props} rotation={[-Math.PI / 0.1, -1.6, 0]}>      
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group rotation={[-Math.PI / 2, 0, 1.7]} scale={100}>
          <mesh
            castShadow //man
            receiveShadow
            geometry={nodes.body_Material001_0.geometry}
            material={materials["Material.001"]}
          />
          <mesh //borderman
            castShadow
            receiveShadow
            geometry={nodes.body_Material002_0.geometry}
            material={materials["Material.002"]}
          />
        </group>
        <group // planetenoir1
          position={[-357.404, 392.646, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={39.706}
        >
          <mesh //planetenoir1/2
            castShadow
            receiveShadow
            geometry={nodes.Sphere002_Material001_0.geometry}
            material={materials["Material.001"]}
          />
          <mesh //haloplanetenoir1
            castShadow
            receiveShadow
            geometry={nodes.Sphere002_Material002_0.geometry}
            material={materials["Material.002"]}
          />
        </group>
        <group //planetenoir2
          position={[299.634, 566, -221.001]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={39.706}
          >
          <mesh //planetenoir2/2
            castShadow
            receiveShadow
            geometry={nodes.Sphere007_Material001_0.geometry}
            material={materials["Material.001"]}

          />
        </group>
        <mesh //lignesfloor
          castShadow
          receiveShadow
          geometry={nodes.waves_Material002_0.geometry}
          material={materials["Material.002"]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[100, 100, 1.891]}
        />
        <mesh //refletmouvementeaucorps
          castShadow
          receiveShadow
          geometry={nodes.waves1_Material002_0.geometry}
          material={materials["Material.002"]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[100, 100, 1.891]}
        />
        <mesh //refletmouvementeaubras
          castShadow
          receiveShadow
          geometry={nodes.waves2_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-25, 15.529, -90]}
          rotation={[-Math.PI / 2, 0, 1.7]}
          scale={[100, 100, 1.891]}
        />
        <mesh  //particules
          castShadow
          receiveShadow
          geometry={nodes.particles_Material002_0.geometry}
          material={materials["Material.001"]}
          position={[489.69, 793.811, 355.293]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={20.408}
        />
        <mesh //1planetwhiteblacklines
          castShadow
          receiveShadow
          geometry={nodes.Sphere_Material001_0.geometry}
          material={materials["Material.001"]}
          position={[-550, 500, -500]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={62}
        />
        <mesh //1planetwhitecore
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-550, 500, -500]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={60}
        />
        <mesh //1planetwhitespiral
          castShadow
          receiveShadow
          geometry={nodes.Sphere004_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-550, 500, -500]}
          rotation={[-0.688, 0, 0]}
          scale={[104, 80, 0]}
        />
            <mesh //2black
          castShadow
          receiveShadow
          geometry={nodes.Sphere_Material001_0.geometry}
          material={materials["Material.001"]}
          position={[-670, 600, 575]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={31.201}
        />
        <mesh //2core
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-670, 600, 575]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={30.162}
        />
        <mesh //2white
          castShadow
          receiveShadow
          geometry={nodes.Sphere004_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-670, 600, 575]}
          rotation={[-0.688, 0, 0]}
          scale={[52.0645, 40.8045, 0]}
        />
         <mesh //3black
          castShadow
          receiveShadow
          geometry={nodes.Sphere_Material001_0.geometry}
          material={materials["Material.001"]}
          position={[670, 600, 575]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={31.201}
        />
        <mesh //3core
          castShadow
          receiveShadow
          geometry={nodes.Sphere001_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[670, 600, 575]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={30.162}
        />
        <mesh //3white
          castShadow
          receiveShadow
          geometry={nodes.Sphere004_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[670, 600, 575]}
          rotation={[-0.688, 0, 0]}
          scale={[52.0645, 40.8045, 0]}
        />
        <mesh //petite boule Perso 1
          castShadow
          receiveShadow
          geometry={nodes.Sphere009_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[375, 130, -15]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={16.881}
          />
            <mesh //petite boule Perso 2
          castShadow
          receiveShadow
          geometry={nodes.Sphere009_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-240, 130, -300]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={16.881}
        />
          <mesh //petite boule Perso 3
          castShadow
          receiveShadow
          geometry={nodes.Sphere009_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-370, 130, 175]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={16.881}
        />
        <mesh //petite boule Perso 4
          castShadow
          receiveShadow
          geometry={nodes.Sphere009_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[200, 130, 300]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={16.881}
        />
        <mesh //petite boule blanche droite
          castShadow
          receiveShadow
          geometry={nodes.Sphere009_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[507.522, 667, -214.475]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={16.881}
        />
        <mesh //petite boule blanche gauche
          castShadow
          receiveShadow
          geometry={nodes.Sphere010_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-287.442, 585.792, -311.857]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={16.881}
        />
        <mesh //petite boule blanche droite
          castShadow
          receiveShadow
          geometry={nodes.Sphere011_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-553.462, 331.074, -379.067]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={11.437}
        />
        <mesh //floor
          castShadow
          receiveShadow
          geometry={nodes.Cube_Material001_0.geometry}
          material={materials["Material.001"]}
          position={[0, -101.673, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[11200.013, 11200.013, 100]}
        />
        <mesh //textureplanetenoir1
          castShadow
          receiveShadow
          geometry={nodes.Sphere003_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[-357.404, 392.646, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={41.075}
        />
        <mesh //textureplanetenoir2
          castShadow
          receiveShadow
          geometry={nodes.Sphere008_Material002_0.geometry}
          material={materials["Material.002"]}
          position={[299.634, 566, -221.001]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={41.075}
        />
      </group>
    </group>
    </a.group>
  );
}
