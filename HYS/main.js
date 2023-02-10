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
camera1.position.set(
  -0.0320475539865685, 
  3, 
  4);
const pointLight1 = new THREE.PointLight(0xffffff);
pointLight1.position.set(0,1,2);
const ambientLight1 = new THREE.AmbientLight(0xffffff);
const controls1 = new OrbitControls(camera1, renderer1.domElement);
controls1.target.set( 
  0.012487779108576954,
  0.5451819395847102,
  -0.2725182101592799
);
controls1.minAzimuthAngle = - Math.PI / 4;
controls1.maxAzimuthAngle = Math.PI / 4;
controls1.minPolarAngle = Math.PI / 4;
controls1.maxPolarAngle = Math.PI / 2;
controls1.minDistance = 3;
controls1.maxDistance = 4;
const lightHelper = new THREE.PointLightHelper(pointLight1);
  const gridHelper = new THREE.GridHelper(200,50);

const scene1BG = new THREE.TextureLoader().load('pink1.jpg');
scene1.background=scene1BG;
    
scene1.add(pointLight1, ambientLight1, 
  // lightHelper,
  // gridHelper
  );
  
const RouteStoryline = document.getElementById('goToStory');
const Valentine = document.getElementById('Valentine');
const IntroEyes = document.getElementById('introEyes');
RouteStoryline.addEventListener('click',()=>{
  Valentine.style.animation='fade-out-bck 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both';
  
  setTimeout(()=>{
    IntroEyes.style.opacity='100%';
    Valentine.style.display='none';
  },1000)
 
  // Valentine.style.display='none';
})


//Storyline
const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

let mixer;
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
        console.log(gltf.animations[3])
        // gltf.animations.forEach( function ( animation ) {
        //   mixer.clipAction( animation ).play();
        // } );
        // mixer.clipAction(glif.animations).stop();
        const SalsaAction = mixer.clipAction(gltf.animations[2]);
        const MacarenaAction = mixer.clipAction(gltf.animations[1]);
        const TwerkAction = mixer.clipAction(gltf.animations[3]);
        const IdleAction = mixer.clipAction(gltf.animations[0]);
        IdleAction.play();
        
        console.log(gltf.animations);
        
        
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

loader.load(
  'YAMAKA.glb', (gltf)=>{
    const Model = gltf.scene;
        scene.add(Model);
        Model.rotateY(-90);
        Model.position.set(
          0,-0.2,5
        )
        Model.scale.set(0.1, 0.1, 0.1);
  }
)



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
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=>
    THREE.MathUtils.randFloatSpread(100)
  );

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('pink.jpg');
scene.background = spaceTexture;

const Hysbg = new THREE.TextureLoader().load('Fotor_AI2.png');

const hys = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({ map: Hysbg})
);
hys.position.set(3,3,3)
// scene.add(hys);

scene.add(pointLight, ambientLight, 
  // lightHelper, 
  gridHelper
  );
  // scene1.add(pointLight1, ambientLight1,gridHelper);


function moveCamera(){
  // const maintag=document.getElementsByTagName('main');
  const t = document.body.getBoundingClientRect().top;
  console.log(t)
  // hys.rotation.x += 0.05;
  // hys.rotation.y += 0.075;
  // hys.rotation.z += 0.05;

    camera.position.set(0,0,0);
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0001;
    camera.position.y = t * -0.0001;
  
  
  
  
      var Opadiv0 = document.getElementById('Opadiv0');
      var position0 = Opadiv0.offsetTop - 750;
      

      function checker(position, domelement){
        if (window.pageYOffset >= position) {
          domelement.style.opacity='100%'; 
        }
      }
      
      checker(position0, Opadiv0);


}





document.body.onscroll = moveCamera

  const clock = new THREE.Clock();
  window.addEventListener( 'resize', onWindowResize, false );
  function onWindowResize() {
          
      camera.aspect = window.innerWidth/ window.innerHeight;
  
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
  
  }
  
function animate() {
  requestAnimationFrame( animate );

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update();
  renderer1.render(scene1, camera1 );
  renderer.render(scene,camera);
  // console.log(camera1.position);
  // console.log(controls1.target);
  if ( mixer ) mixer.update( clock.getDelta() );
}

animate();