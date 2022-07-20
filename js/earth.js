(() => {

   const toRadian = d => Math.PI * d/180;
   
   let isMobile = false;

   const onResize = () => {
      const w = window.innerWidth;
      if(w < 1200) {
         isMobile = true;
      } else {
         isMobile = false;
      }
      console.log(isMobile)
   }

   window.addEventListener('resize', onResize);
   document.addEventListener("DOMContentLoaded", onResize);

   const earth3d = (() => {

      let container, renderer, scene, aspect, fov, camera, earth, glow;
      let isMove = true;
   
      const countryRotations = [
         { x: 10, y: 240 },
         { x: 5, y: 192 },
         { x: 46, y: 215 },
      ];
   
      function init () {
         container = document.querySelector('#earthCon');
         renderer = new THREE.WebGLRenderer({ alpha: true });
         scene = new THREE.Scene();
         fov = 45;
         aspect = container.offsetWidth / container.offsetHeight;
         camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1500);
   
         // let orbitControls = new THREE.OrbitControls(camera);
   
         renderer.setSize(container.offsetWidth, container.offsetHeight);
         renderer.setClearColor( 0xffffff, 0);
         container.appendChild(renderer.domElement);
   
         camera.position.set(0, 0, 2.1);
   
         earth = createPlanet({
            surface: {
               size: 0.5,
               material: {
                  bumpScale: 0.03,
                  specular: new THREE.Color('gray'),
                  shininess: 5,
                  transparent: true
               },
               textures: {
                  map: '../img/2k_earth_daymap.jpg',
                  bumpMap: '../img/earthbump1k.jpg',
                  specularMap: '../img/earthspec1k.jpg'
               }
            },
            atmosphere: {
               size: 0.0025,
               material: {
                  opacity: 0.8
               },
               textures: {
                  map: '../img/earthcloudmap.jpg',
                  alphaMap: '../img/earthcloudmaptrans.jpg',
               }
            },
         });
   
         earth.receiveShadow = true;
         earth.castShadow = true;
         earth.getObjectByName('surface').geometry.center();
         earth.position.set(0, 0.15, 0);
   
         let spotLight1 = new THREE.SpotLight(0xffffff, 0.5, 0, 1, 0);
         let spotLight2 = new THREE.SpotLight(0xffffff, 1, 0, 1, 0);
   
         spotLight1.position.set(2, -1, 1);
         spotLight2.position.set(-2, 1, 1);
   
         let textureLoader = new THREE.TextureLoader();
         textureLoader.crossOrigin = true;
         textureLoader.load(
            '../img/earth-glow.png',
            (texture) => {
               var glowMat = new THREE.SpriteMaterial({
                  map: texture,
                  depthTest: false
               });
            
               glow = new THREE.Sprite(glowMat);
               glow.scale.set(1, 1, 1);
               camera.add(glow);
               glow.position.set(0, 0.15, -1.93);
            }
         );
   
         scene.add(camera);
         scene.add(earth);
         scene.add(spotLight1);
         scene.add(spotLight2);
   
         renderer.render(scene, camera);
         render();

         const resize = () => {
            aspect = container.offsetWidth / container.offsetHeight;
            
            fov = 45;
            if(isMobile) {
               fov = 55
            }

            camera.aspect = aspect;
            camera.fov = fov;
            camera.updateProjectionMatrix();
            renderer.setSize( container.offsetWidth, container.offsetHeight );
         }

         window.addEventListener('resize', resize);
         resize();         
      }
   
      let planetProto = {
         sphere: size => {
            let sphere = new THREE.SphereGeometry(size, 32, 32);  
            return sphere;
         },
   
         material: options => {
            let material = new THREE.MeshPhongMaterial();
            if (options) {
               for (var property in options) {
                  material[property] = options[property];
               } 
            }
         
         return material;
         },
   
         texture: (material, property, uri) => {
            let textureLoader = new THREE.TextureLoader();
            textureLoader.crossOrigin = true;
            textureLoader.load( uri, (texture) => {
               material[property] = texture;
               material.needsUpdate = true;
            });
         }
      };
   
      function createPlanet (options) {
         
         let surfaceGeometry = planetProto.sphere(options.surface.size);
         let surfaceMaterial = planetProto.material(options.surface.material);
         let surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
         
         let atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
         let atmosphereMaterialDefaults = {
         side: THREE.DoubleSide,
         transparent: true
         }
   
         let atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
         let atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
         let atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
         
         
         let planet = new THREE.Object3D();
         surface.name = 'surface';
         atmosphere.name = 'atmosphere';
         planet.add(surface);
         planet.add(atmosphere);
         
         
         for (let textureProperty in options.surface.textures) {
            planetProto.texture(
               surfaceMaterial,
               textureProperty,
               options.surface.textures[textureProperty]
            ); 
         }
         
         for (let textureProperty in options.atmosphere.textures) {
            planetProto.texture(
               atmosphereMaterial,
               textureProperty,
               options.atmosphere.textures[textureProperty]
            );
         }
         
         return planet;
      };
   
      function render ( time ) {
         if(isMove) {
            earth.rotation.y += 0.002;
            if(earth.rotation.y >= Math.PI * 2) {
               earth.rotation.y = Math.PI * 2 - earth.rotation.y;
            }
            earth.getObjectByName('atmosphere').rotation.y += 0.002;
         }else {
            earth.getObjectByName('atmosphere').rotation.y += 0.001;
         }
         
         requestAnimationFrame(render);
         renderer.render(scene, camera);
      }
   
      document.addEventListener("DOMContentLoaded", init);
   
      return {
         earth: () => earth,
         rotateCountry : idx => {
            if(idx === 0) {
               isMove = true;
               gsap.to(earth.rotation, 1, { x: 0, ease: Cubic.easeInOut });
               gsap.to(renderer.domElement, 0.6, { x: 0, y:0, ease: Cubic.easeOut});
            } else {
               isMove = false;
               gsap.to(earth.rotation, 1, {
                  x: toRadian(countryRotations[idx-1].x), 
                  y: toRadian(countryRotations[idx-1].y), 
                  ease: Cubic.easeInOut
               });
               if(isMobile) {
                  gsap.to(renderer.domElement, 0.6, { y: 120, ease: Cubic.easeOut});
               } else {
                  gsap.to(renderer.domElement, 0.6, { x: 275, ease: Cubic.easeOut});
               }
            }
         }
      }
      
   })();
   
   
   const earthList = (()=> {
      const listData = [
         {
            name: 'John Kaplan',
            type: 'PHOTOGRAPHER',
            location: 'United States',
            desc: [
               `1992 Pulitzer Prize<br> 
               awarded twice`,
               `The Robert F. Kennedy<br>
               Prize `,
               `Harry Chapin Media Award`,
               `Best Photojournalism<br>
               Award`,
               `The current judge of the<br>
               Fury Award`
            ]
         },
         {
            name: 'Amira al Sharif',
            type: 'PHOTOGRAPHER',
            location: 'Saudi Arabia',
            desc: [
               `She has received project 
               grants from AFAC, Magnum 
               Foundation, and Prince 
               Claus Foundation. As an 
               educator, she is committed 
               to educating Yemeni 
               photographers, and runs 
               workshops in documentary 
               photography and 
               photojournalism.`
            ]
         },
         {
            name: 'Harri Kallio',
            type: 'PHOTOGRAPHER',
            location: 'Finland',
            desc: [
               `2003 BFF Publicity Award`,
               `2002 and 2003 Finnish<br>
               Cultural Foundation Awards`,
               `Finnish Arts Council<br> 
               Awards 2000, 2004, 2006,<br> 
               and 2008`
            ]
         }
      ];
   
      let container, listCon, prevBtn, nextBtn, infoCon;
      let currentIdx = 0;
      const listAr = [];
      const listPosition = [300, 40, 60];
      let radius = 430;
      let isTransition = false;
      let isInfo = false;
   
   
      function init() {
   
         container = document.querySelector('#earthList');
         listCon = container.querySelector('.list-con');
         prevBtn = container.querySelector('.prev-btn');
         nextBtn = container.querySelector('.next-btn');
         infoCon = container.querySelector('.info-con');
   
         listData.forEach(( data, i) => {
            const list = document.createElement('div');
            const circle = document.createElement('div');
            const text = document.createElement('div');
            list.className = 'list';
            list.classList.add("idx" + i);
            list.setAttribute('idx', i);
            list.style.zIndex = listData.length - i;
            list.style.cursor = 'pointer';
            list.addEventListener('click', () => clickList(list, i));
            circle.className = 'circle';
            circle.innerHTML = data.name;
            text.className = 'text';
            text.innerHTML = `${data.name.toUpperCase()} / ${data.type}`;
            if(i === 0) text.style.opacity = 1;
            list.appendChild(circle);
            list.appendChild(text);
            listCon.appendChild(list);
            listAr.push(list);

            const resize = () => {
               if(isMobile) {
                  if(window.innerWidth <= 640) {
                     radius = 130;
                     listPosition[1] = 30;
                  } else {
                     radius = 250;
                     listPosition[1] = 37;
                  }
               } else {
                  radius = 430   
                  listPosition[1] = 40;
               }
               
               isInfo = false;
               hideInfo();
               setPosition();
            }
   
            window.addEventListener('resize', resize);
            resize();  
         });
   
         prevBtn.addEventListener('click', () => prevPage());
         nextBtn.addEventListener('click', () => nextPage());
         
         setPosition();
         
      }
   
      function clickList( list, num ) {
         const idx = parseInt(list.getAttribute('idx'));
         if(idx == 0) {
            if(!isInfo) showInfo(num);
         } else {
            nextPage();
         }  
      }
   
      function setPosition () {
         listAr.forEach(( list, i) => {
            const idx = parseInt(list.getAttribute('idx'));
            list.ro = listPosition[idx];
            gsap.set(list, {x: Math.sin(toRadian(list.ro)) * radius});
         });
      }
   
      function showInfo( idx ) {
         isInfo = true;
         infoCon.style.display = 'block';
         const location = infoCon.querySelector('.location');
         const thumb = infoCon.querySelector('.thumb');
         const name = infoCon.querySelector('.name');
         const type = infoCon.querySelector('.type');
         const listSet = infoCon.querySelector('.list-set');
         const infoSet = infoCon.querySelector('.info-set');
         const arrow = infoCon.querySelector('.arrow');
   
         location.innerHTML = listData[idx].location;
         thumb.innerHTML = `<img src="../img/earth-list-img${idx+1}.png" />`;
         name.innerHTML = listData[idx].name;
         type.innerHTML = listData[idx].type;

         if(idx == 1) {
            name.style.fontSize = '16px';
         } else {
            name.style.fontSize = '';
         }
   
         let listHtml = '';
         if(!isMobile) {
            listData[idx].desc.forEach( list => listHtml += `<li>${list}</li>`);
         } else {
            listData[idx].desc.forEach( list => listHtml += `<li>${list.replace(/<br>/g, '')}</li>`);
         }
         listSet.innerHTML = listHtml;
         earth3d.rotateCountry(idx+1);
         if(!isMobile) {
            gsap.set(infoSet, {x: 100, scaleX: 0.5, scaleY: 0.5, opacity: 0, transformOrigin: 'center right'});
            gsap.set(arrow, {x: -150, opacity: 0});
            gsap.to(infoSet, 0.6, {x: 0, scaleX: 1, scaleY: 1, opacity: 1, ease: Cubic.easeOut});
            gsap.to(arrow, 0.6, {delay:0.1, x: 0, opacity: 1, ease: Cubic.easeOut});
         } else {
            gsap.set(infoSet, {y: 50, opacity: 0});
            gsap.set(arrow, {y: -50, opacity: 0});
            gsap.to(infoSet, 0.6, {y: 0, opacity: 1, ease: Cubic.easeOut});
            gsap.to(arrow, 0.6, {delay:0.1, y: 0, opacity: 1, ease: Cubic.easeOut});
         }
      }
   
      function hideInfo () {
         isInfo = false;
         infoCon.style.display = 'none';
         earth3d.rotateCountry(0);
      }
   
      function nextPage () {
         if(isTransition) return;
         currentIdx += 1;
         if(currentIdx > listAr.length -1) {
            currentIdx = 0;
         }
         if(isInfo) hideInfo();
         isTransition = true;
         listAr[currentIdx].ro = 400;
         listAr.forEach(( list, i) => {
            let num = i - currentIdx;
            if(num < 0) {
               num = listAr.length + num;
            }
            const text = listAr[i].querySelector('.text');
            gsap.killTweensOf(text);
            gsap.set(text, {opacity: 0});
            listAr[i].classList.remove("idx0");
            listAr[i].classList.remove("idx1");
            listAr[i].classList.remove("idx2");
            listAr[i].classList.add("idx" + num);
            listAr[i].setAttribute('idx', num);
            const ro = listPosition[num];
            gsap.to(listAr[i], 0.6, {ro: ro, 
               onUpdate: () => {
                  gsap.set(listAr[i], {x: Math.sin(toRadian(listAr[i].ro)) * radius});
               },
               onComplete: () => {
                  setPosition();
                  isTransition = false;
                  if(i === currentIdx){
                     const targetText = listAr[i].querySelector('.text');
                     gsap.set(targetText, {x: 20});
                     gsap.to(targetText, 0.3, {opacity: 1, x:0, ease: Cubic.easeOut});
                  }
               }
            });
            listAr[i].style.zIndex = listAr.length - num;
         });
         num = currentIdx-1;
         if(num < 0) num = listAr.length-1;
         gsap.to(listAr[num], 0.1, {opacity: 0});
         gsap.to(listAr[num], 0.2, {delay: 0.4, opacity: 1});
      }
   
      function prevPage () {
         if(isTransition) return;
         currentIdx -= 1;
         if(currentIdx < 0) {
            currentIdx = listAr.length -1;
         }
         if(isInfo) hideInfo();
         isTransition = true;
         let num = currentIdx+1;
         if(num > listAr.length -1) num = 0;
         listAr[num].ro = -60;
         listAr.forEach(( list, i) => {
            let num = i - currentIdx;
            if(num < 0) {
               num = listAr.length + num;
            }
            const text = listAr[i].querySelector('.text');
            gsap.killTweensOf(text);
            gsap.set(text, {opacity: 0});
            listAr[i].classList.remove("idx0");
            listAr[i].classList.remove("idx1");
            listAr[i].classList.remove("idx2");
            setTimeout(() => {
               listAr[i].classList.add("idx" + num);
               listAr[i].setAttribute('idx', num);
            }, 200);
            
            const ro = listPosition[num];
            gsap.to(listAr[i], 0.6, {ro: ro, 
               onUpdate: () => {
                  gsap.set(listAr[i], {x: Math.sin(toRadian(listAr[i].ro)) * radius});
               },
               onComplete: () => {
                  listAr[i].style.zIndex = listAr.length - num;
                  setPosition();
                  isTransition = false;
                  if(i === currentIdx){
                     const targetText = listAr[i].querySelector('.text');
                     gsap.set(targetText, {x: -20});
                     gsap.to(targetText, 0.3, {opacity: 1, x:0, ease: Cubic.easeOut});
                  }
               }
            });
         });
         gsap.to(listAr[currentIdx], 0.1, {opacity: 0});
         gsap.to(listAr[currentIdx], 0.2, {delay: 0.4, opacity: 1});
      }
   
      document.addEventListener("DOMContentLoaded", init);
   
   })(); 
})();

