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

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "../assets/3d/fox.glb";

// 3D Model from: https://sketchfab.com/3d-models/fox-f372c04de44640fbb6a4f9e4e5845c78
export function Fox({ currentAnimation, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF( scene);
  const { actions } = useAnimations(animations, group);

  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

   if (actions["Armature.002|Armature.002|idle|Armature.002|idle"]) {
     actions["Armature.002|Armature.002|idle|Armature.002|idle"].play();
    }
  }, [actions, ["Armature.002|Armature.002|walk.left|Armature.002|walk.left"]]);

  return (
    <group ref={group} {...props} dispose={null}>
    <group name="Sketchfab_Scene">
      <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, -0.2]}>
        <group name="root">
          <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Armature002_27">
              <group name="GLTF_created_0">
                <primitive object={nodes.GLTF_created_0_rootJoint} />
                <skinnedMesh
                  name="Object_7"
                  geometry={nodes.Object_7.geometry}
                  material={materials["Material.025"]}
                  skeleton={nodes.Object_7.skeleton}
                />
                <skinnedMesh
                  name="Object_8"
                  geometry={nodes.Object_8.geometry}
                  material={materials["Material.026"]}
                  skeleton={nodes.Object_8.skeleton}
                />
                <skinnedMesh
                  name="Object_9"
                  geometry={nodes.Object_9.geometry}
                  material={materials["Material.027"]}
                  skeleton={nodes.Object_9.skeleton}
                />
                <skinnedMesh
                  name="Object_10"
                  geometry={nodes.Object_10.geometry}
                  material={materials["Material.028"]}
                  skeleton={nodes.Object_10.skeleton}
                />
                <skinnedMesh
                  name="Object_11"
                  geometry={nodes.Object_11.geometry}
                  material={materials["Material.029"]}
                  skeleton={nodes.Object_11.skeleton}
                />
                <skinnedMesh
                  name="Object_12"
                  geometry={nodes.Object_12.geometry}
                  material={materials["Material.031"]}
                  skeleton={nodes.Object_12.skeleton}
                />
                <skinnedMesh
                  name="Object_13"
                  geometry={nodes.Object_13.geometry}
                  material={materials["Material.032"]}
                  skeleton={nodes.Object_13.skeleton}
                />
                <skinnedMesh
                  name="Object_14"
                  geometry={nodes.Object_14.geometry}
                  material={materials["Material.001"]}
                  skeleton={nodes.Object_14.skeleton}
                />
                <skinnedMesh
                  name="Object_15"
                  geometry={nodes.Object_15.geometry}
                  material={materials["Material.002"]}
                  skeleton={nodes.Object_15.skeleton}
                />
                <skinnedMesh
                  name="Object_16"
                  geometry={nodes.Object_16.geometry}
                  material={materials["Material.005"]}
                  skeleton={nodes.Object_16.skeleton}
                />
                <skinnedMesh
                  name="Object_17"
                  geometry={nodes.Object_17.geometry}
                  material={materials["Material.004"]}
                  skeleton={nodes.Object_17.skeleton}
                />
                <skinnedMesh
                  name="Object_18"
                  geometry={nodes.Object_18.geometry}
                  material={materials.material_0}
                  skeleton={nodes.Object_18.skeleton}
                />
                <group name="Cube001_26" />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  </group>
);
}