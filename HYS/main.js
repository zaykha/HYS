import './style.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

// Intro 
const scene1 = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer1 = new THREE.WebGLRenderer({
  canvas: document.querySelector('#hysintro'),
})
renderer1.setPixelRatio( window.devicePixelRatio);
renderer1.setSize( window.innerWidth, window.innerHeight);
// x: -0.4784776095349479, y: 1.8030176126297675, z: 2.709336202576902
// x: -0.011503262016102512, y: 0.9300151056055409, z: -0.12258921690164955
camera1.position.set(
  -0.4784776095349479, 
  1.8030176126297675, 
  2.709336202576902);
//   camera1.rotateX(0.3);
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0,0.5,0.5)
const ambientLight1 = new THREE.AmbientLight(0xffffff);
ambientLight1.intensity = 1;
const controls1 = new OrbitControls(camera1, renderer1.domElement);
controls1.target.set( 
  -0.011503262016102512,
  0.9300151056055409,
  -0.1225892169016495
  // -0.2725182101592799
);
controls1.minAzimuthAngle = - Math.PI / 4;
controls1.maxAzimuthAngle = Math.PI / 4;
controls1.minPolarAngle = Math.PI / 4;
controls1.maxPolarAngle = Math.PI / 2;
controls1.minDistance = 3;
controls1.maxDistance = 4;

  const gridHelper = new THREE.GridHelper(200,50);

const scene1BG = new THREE.TextureLoader().load('pink1.jpg');
scene1.background=scene1BG;
    
scene1.add(pointLight1, 
  ambientLight1, 
  // lightHelper,
  // gridHelper
  );
  
const RouteStoryline = document.getElementById('goToStory');
const backToDance = document.getElementById('backToDance');


const Valentine = document.getElementById('Valentine');
const IntroEyes = document.getElementById('introEyes');
backToDance.addEventListener('click',()=>{
  Valentine.style.opacity="1";
  Valentine.style.display="block";
  Valentine.style.animation='none';

})

RouteStoryline.addEventListener('click',()=>{
  Valentine.style.animation='fade-out-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
  
  setTimeout(()=>{
    IntroEyes.style.opacity='100%';
    Valentine.style.display='none';
  },1000)
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  // Valentine.style.display='none';
})



//Storyline
const scene = new THREE.Scene();

const materialpurple = new THREE.MeshStandardMaterial({
  envMap: reflectionCubepurple,
  roughness: 1,
  metalness: 1,
  emissive: new THREE.Color(0xff08ea),
  emissiveIntensity: 10,
  color: 0xffffff
})


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

let mixer;
let mixer1;
const loadingManager = new THREE.LoadingManager();

const progressBar = document.getElementById('progress-bar');
loadingManager.onProgress = function(url, loaded, total){
    progressBar.value = (loaded/total)*100;
}

const progressBarContainer = document.querySelector('.progress-bar-container');
loadingManager.onLoad = function(){
    progressBarContainer.style.display = 'none';
}

const loader = new GLTFLoader(loadingManager);
loader.load(
    'MZKAvatar.glb', (gltf)=>{
        const Model = gltf.scene;
        scene1.add(Model);
        mixer = new THREE.AnimationMixer(Model);
        const SalsaAction = mixer.clipAction(gltf.animations[2]);
        const MacarenaAction = mixer.clipAction(gltf.animations[1]);
        const TwerkAction = mixer.clipAction(gltf.animations[3]);
        const IdleAction = mixer.clipAction(gltf.animations[0]);
        IdleAction.play();
        
        // console.log(gltf.animations);
        
        
  const Macarena=document.getElementById('macarena');
      Macarena.addEventListener('click', () => {
        SalsaAction.stop();
        TwerkAction.stop();
        IdleAction.stop();
      
      MacarenaAction.setDuration(gltf.animations[1].duration * 1.5);
      MacarenaAction.play();
      
      
  }); 
  const Salsa=document.getElementById('salsa');
      Salsa.addEventListener('click', () => {
        MacarenaAction.stop(); 
        TwerkAction.stop();
        IdleAction.stop();

        SalsaAction.setDuration(gltf.animations[2].duration * 1.4);
        SalsaAction.play();
    
      
  });  
  const Twerk=document.getElementById('twerk');
      Twerk.addEventListener('click', () => {
        MacarenaAction.stop(); 
        SalsaAction.stop();
        IdleAction.stop();
        
        // Model.rotateX(0.2);
        // Model.rotateZ(-0.2);
        // Model.rotateY(-0.3);
        TwerkAction.setDuration(gltf.animations[3].duration * 1.4);
        TwerkAction.play();
       
  });       
    },
    ( xhr ) => {
        // called while loading is progressing
       console.log(`${( xhr.loaded / xhr.total * 100 )}% loaded`);
        // console.log(  );
    },
    ( error ) => {
        // called when loading has errors
        console.error( 'An error happened', error );
    },
)


let light2 = new THREE.PointLight('0xffffff', 3, 10);
const lightHelper2 = new THREE.PointLightHelper(light2);
// light2.position.set(-0.8,1.1,1.3);
// scene.add(light2);
loader.load(
  'YAMAKA.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(0,-0.5,-0.5);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(0,-0.5,-0.5);
        }else{
          Model.position.set(0,-0.5,-0.5);

        }  
        Model.scale.set(0.1, 0.1, 0.1);
  }
)
loader.load(
  'sheArrives.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(0,0,4);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(0,-0.5,6.5);
        }else{
          Model.position.set(0,-0.5,16.5);

        }  
        Model.scale.set(0.1, 0.1, 0.1);
        Model.rotateY(0.6);
  }
)
loader.load(
  'BBistro.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(0,0,8);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(0.3,-0.1,14.9);
        }else{
          Model.position.set(0.3,-0.1,32);

        } 
        // Model.position.set(
        //   0.3,0.1,16
        // )
        Model.scale.set(0.1, 0.1, 0.1);
        Model.rotateY(0.4);
  }
)

light2.position.set(-1,0.8,34);
// scene.add(light2)
loader.load(
  'dinning.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        // Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(-1,0.1,12);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(-1,0.1,24);
        }else{
          Model.position.set(-1,0.1,48);
        } 
        // Model.position.set(
        //   -1,0.1,24
        // )
        Model.scale.set(0.1, 0.1, 0.1);
        Model.rotateY(0.4);
  }
)
loader.load(
  'balcony.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(0.5,0.1,12);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(0.5,0.1,22.5);
        }else{
          Model.position.set(0.5,0.1,48);

        } 
        // Model.position.set(
        //   0.5,0.1,32
        // )
        Model.scale.set(0.1, 0.1, 0.1);
        Model.rotateY(0.1);
  }
)
loader.load(
  'hyspic.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(2,0.3,17);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(2,0.3,33);
        }else{
          Model.position.set(2,0.3,66);

        } 
        // Model.position.set(
        //   2,0.3,40
        // )
        Model.scale.set(0.1, 0.1, 0.1);
        Model.rotateY(0.2);
  }
)
loader.load(
  'reserved.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(0,0,16);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(0,0,30.2);
        }else{
          Model.position.set(1,0.3,64);
        } 
        // Model.position.set(
        //   1,0.3,48
        // )
        Model.scale.set(0.1, 0.1, 0.1);
        Model.rotateY(0.5);
  }
)
loader.load(
  'kiss.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        if (window.innerHeight < 720) {
          // set model position for mobile
          Model.position.set(0,0,12);
        } else if(window.innerHeight < 1200) {
          // set model position for desktop
          Model.position.set(-0.2,0,37);
        }else{
          Model.position.set(1,0.3,80);

        } 
        // Model.position.set(
        //   1,0.3,80
        // )
        Model.scale.set(0.1, 0.1, 0.1);
        Model.rotateY(0.7);
  }
)
let light1 = new THREE.PointLight('white', 1, 50);
const lightHelper = new THREE.PointLightHelper(light1);
if (window.innerHeight < 720) {
  // set model position for mobile
 light1.position.set(0,0,12);
} else if(window.innerHeight < 1200) {
  // set model position for desktop
 light1.position.set(0.2, 0.7, 43.7);
}else{
  light1.position.set(1,2,98);

} 


var textureLoader = new THREE.CubeTextureLoader();
textureLoader.setPath( 'textures/' );

var reflectionCube = textureLoader.load([
  '1.png', '2.png',
  '3.png', '4.png',
  '5.png', '6.png'
]);
var reflectionCubepurple = textureLoader.load([
  'purple.png', 'purple1.png',
  'purple3.png', 'purple4.png',
  'purple5.png', 'purple2.png'
]);


const material1 = new THREE.MeshStandardMaterial({
  envMap: reflectionCube,
  roughness: 0.7,
  metalness: 1,
  // emissive: new THREE.Color(0xff08ea),
  // emissiveIntensity: 1,
  color: 0xff08ea
});

loader.load(
  'heart.glb', (gltf) => {
    const Model1 = gltf.scene;
    scene.add(Model1);
    Model1.traverse( function ( node ) {
      if ( node.isMesh ) node.material = material1;
    });

    Model1.rotateY(-80);
    if (window.innerHeight < 720) {
      // set model position for mobile
      Model1.position.set(0,0,12);
    } else if(window.innerHeight < 1200) {
      // set model position for desktop
      Model1.position.set(0.2, 0, 43);
    }else{
      Model1.position.set(1, 0, 96);

    } 
    
    Model1.scale.set(1, 1, 1);

    
    light1.target = Model1;
    console.log(gltf.animations);

    const Heartanimation = document.getElementById('Heartanimation');
    Heartanimation.addEventListener('click', () => {
      console.log('Button clicked');
      mixer1 = new THREE.AnimationMixer(gltf.scene);
      
      gltf.animations.forEach(clip => {
        var action = mixer1.clipAction(clip);
        action.setDuration(gltf.animations[2].duration * 0.01);
        action.play();
      });
    });
  }
);
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight);
// camera.position.setZ(30);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color:0xff1a7e} );
const torus = new THREE.Mesh( geometry, material);

// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(10,15,12);

const ambientLight = new THREE.AmbientLight(0xffffff);


const controls = new OrbitControls(camera, renderer.domElement)



function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24,24);
  const material = new THREE.MeshStandardMaterial( {color:0xff1a7e});
  const star = new THREE.Mesh(geometry, materialpurple);

  const [x,y,z] = Array(3).fill().map(()=>
    THREE.MathUtils.randFloatSpread(100)
  );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('purple.png');
scene.background=spaceTexture;

const Hysbg = new THREE.TextureLoader().load('Fotor_AI2.png');

const hys = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: Hysbg})
);
hys.position.set(3,3,3)
scene.add(hys);

scene.add(pointLight, 
  ambientLight, 
  light1, 
  // lightHelper, 
  // gridHelper
  );
  // scene1.add(pointLight1, ambientLight1,gridHelper);

  const cover=document.getElementById('cover');

function moveCamera(){
  // const maintag=document.getElementsByTagName('main');
  const t = document.body.getBoundingClientRect().top;
  // console.log(t)
  hys.rotation.x += 0.05;
  hys.rotation.y += 0.075;
  hys.rotation.z += 0.05;

  if(window.innerWidth <768){
    if(t>-2){
      cover.style.opacity='100%';
      cover.style.display='block';
 
    }else if(t<-2){
      cover.style.opacity='0';
      cover.style.display='none';
    }
  }else{
    if(t>-100){
      cover.style.opacity='100%';
      cover.style.display='block';
 
    }else if(t<-100){
      cover.style.opacity='0';
      cover.style.display='none';
    }
  }
    


    camera.position.set(0,0,0);
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0001;
    camera.position.y = t * -0.0001;
  

}
const Promptletter = document.getElementById('prompt');
const InputPass = document.getElementById('inputpass');
const SubmitPass = document.getElementById('submitpass');
const LetterToHys = document.getElementById('lettertohys');

const BackfromPass = document.getElementById('backfrompass');
const BackfromLetterToHYS = document.getElementById('backfromlettertohys');
const LetterToMZK = document.getElementById('lettertoMZK');
const LetterMZK = document.getElementById('letterMZK');
const SendMZK = document.getElementById('sendMZK');


document.getElementById('loveletter').addEventListener('click',()=>{
  Promptletter.style.opacity='1';

  setTimeout(() => {
    Promptletter.style.display='flex';
  }, 500);
  
});
BackfromPass.addEventListener('click',()=>{
  Promptletter.style.opacity='0';

  setTimeout(() => {
    Promptletter.style.display='none';
  }, 500);
})


SubmitPass.addEventListener('click',()=>{
  console.log(InputPass.value)
  if(InputPass.value == 'u!$$o&w%6wwo%5'){
    Promptletter.style.opacity='0';
    LetterToHys.style.opacity='1';


    setTimeout(() => {
      Promptletter.style.display='none';
    LetterToHys.style.display='flex';
    }, 600);
    

  }else{
    alert('OOPs! This Letter is only for HYS.')
  }
})
BackfromLetterToHYS.addEventListener('click',()=>{
  LetterToHys.style.opacity='0';

  setTimeout(() => {
    LetterToHys.style.display='none';
    
  }, 600);
})

document.body.onscroll = moveCamera

  const clock = new THREE.Clock();
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
          
      camera.aspect = window.innerWidth/ window.innerHeight;
  
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
  
  }
  function SendMail(){
    var params ={
      message: document.getElementById('message').value
    }
    emailjs.send("service_mbbh87o","template_4q2i559", params).then(
      function (res){
        alert('Successfully sent to MZK' + res.status);
      }
    )
  }
  LetterToMZK.addEventListener('click',()=>{
    LetterMZK.style.opacity='1';

    setTimeout(() => {
      LetterMZK.style.display='flex';
    }, 500);
  })
  
  

SendMZK.addEventListener('click', ()=>{
  SendMail();
  LetterMZK.style.opacity='0';
  LetterToHys.style.opacity='0';
  setTimeout(() => {
    LetterMZK.style.display='none';
    LetterToHys.style.display='none';
  }, 600);

})

function animate() {
  requestAnimationFrame( animate );

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  controls.update();
  renderer1.render(scene1, camera1 );
  renderer.render(scene,camera);
  // renderer2.render(scene2, camera2);
  // console.log(camera1.position);
  // console.log(controls1.target);
  if ( mixer ) mixer.update( clock.getDelta() );
  if ( mixer1 ) mixer1.update( clock.getDelta() );

}

animate();