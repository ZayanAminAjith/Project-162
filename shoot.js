AFRAME.registerComponent("bowl", {
    init: function(){
        this.shootBowl()
    },
    shootBowl: function(){
        window.addEventListener("click",() => {
            var bowl = document.createElement("a-entity")
            bowl.setAttribute("geometry",{
                primitive: "sphere",
                radius: 0.5
            })
            bowl.setAttribute("material",{
                color: "grey"
            })

            bowl.setAttribute("dynamic-body",{
                shape: "sphere",
              })

            var cam = document.querySelector("#camera")
            pos = cam.getAttribute("position")
            bowl.setAttribute("position",{
                x: pos.x,
                y: pos.y,
                z: pos.z
            })
           
            var camera = document.querySelector("#camera").object3D
            var direction = new THREE.Vector3()
            camera.getWorldDirection(direction)
            bowl.setAttribute("velocity",direction.multiplyScalar(-10))
            bowl.addEventListener("collide",this.removeBowl)
            var scene = document.querySelector("#scene")
            scene.appendChild(bowl)
        })
    },
    removeBowl: function (e) {
         //Original entity (bullet)
        console.log(e.detail.target.el);

        //Other entity, which bullet touched.
        console.log(e.detail.body.el);

        //bowl element
        var element = e.detail.target.el
       
        //element which is hit
        var elementHit = e.detail.body.el
     
        if (elementHit.id.includes("pin")){       
          //impulse and point vector
            var impulse = new CANNON.Vec3(0.7,0.7,0.7)
            var worldPoint = new CANNON.Vec3().copy(elementHit.getAttribute("position"))
    
            elementHit.body.applyImpulse(impulse,worldPoint)
            //remove event listener
            element.removeEventListener("collide", this.shootBowl)
            
            var scene = document.querySelector("#scene")
            //remove the bowls from the scene
            scene.removeChild(element)
        }
      },
});
    
    