// Représentation d'un produit "camera"

class Camera {
    constructor(jsonCamera) {
        jsonCamera && Object.assign(this, jsonCamera);
    }
}

// Représentation des produits

class CameraManager {
    constructor(listCamera) {
        this.listCamera = listCamera;
    }
}

class Option {
    constructor(jsonOption) {
        jsonOption && Object.assign(this, jsonOption);
    }
}