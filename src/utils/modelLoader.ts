import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import * as THREE from "three";

export class ModelLoader {
	private readonly mtlLoader = new MTLLoader();
	private readonly objLoader = new OBJLoader();

	async loadModel(): Promise<THREE.Group> {
		// load an MTL (Material Template Library) for the model
		const modelMTL = await this.mtlLoader.loadAsync(
			"assets/models/solar_panel/10781_Solar-Panels_V1.mtl"
		);
		modelMTL.preload();

		this.objLoader.setMaterials(modelMTL);

		const modelRoot = await this.objLoader.loadAsync(
			"assets/models/solar_panel/10781_Solar-Panels_V1.obj"
		);

		// Scale down the model (e.g., to 10% of its original size)
		const scaleFactor = 0.1;
		modelRoot.scale.set(scaleFactor, scaleFactor, scaleFactor);

		return modelRoot;
	}

	updateModelRotation(model: THREE.Group): void {
		model.rotation.y += 0.01;
	}
}
