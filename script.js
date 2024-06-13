let eyes = document.querySelectorAll('.eye')
let lastPos = [];

function spawnEyes(){

    let x = Math.random() * window.innerWidth * 0.8
    let y = Math.random() * window.innerHeight * 0.8

    while (Math.sqrt(((lastPos[0] - x)**2 + lastPos[1] - y)**2) < 150 && lastPos != []){
        x = Math.random() * window.innerWidth * 0.8
        y = Math.random() * window.innerHeight * 0.8
        console.log(Math.sqrt(((lastPos[0] - x)**2 + (lastPos[1] - y)**2)))
    }

    const eyeBox = document.createElement('div')

    const eye1 = document.createElement('div')
    const iris1 = document.createElement('div')

    const eye2 = document.createElement('div')
    const iris2 = document.createElement('div')

    eyeBox.classList.add('eye-box')

    eye1.classList.add('eye')
    eye2.classList.add('eye')
    iris1.classList.add('iris')
    iris2.classList.add('iris')

    eye1.appendChild(iris1)
    eye2.appendChild(iris2)

    eyeBox.appendChild(eye1)

    document.body.appendChild(eyeBox)
    eyeBox.style.left = x + 'px'
    eyeBox.style.top = y + 'px'

    lastPos = []
    lastPos.push(x)
    lastPos.push(y)

    console.log(lastPos, x, y)

    
}

setInterval(() => {
     spawnEyes()
     eyes = document.querySelectorAll('.eye')
}, 1000)

window.onmousemove = e => {
    const mouseX = e.clientX
    const mouseY = e.clientY
    eyes.forEach(eye => {
        const pos = eye.getBoundingClientRect()
        const x = pos.x + pos.width / 2
        const y = pos.y + pos.width / 2

        const diff_x = (mouseX - x)
        const diff_y = (mouseY - y)
        
        const distance = Math.sqrt((mouseX - x)**2 + (mouseY - y)**2)
        const cos = diff_x / distance
        const sin = diff_y / distance
        
        
        const angle_cos = Math.acos(cos) * 180 / Math.PI
        const angle_sin = Math.asin(sin) * 180 / Math.PI
        
        let angle;

        if (angle_sin < 0 && Math.abs(angle_sin).toFixed(1) != Math.abs(angle_cos).toFixed(1)){
            angle = 180 + Math.abs(angle_sin)
        } else if (Math.abs(angle_cos).toFixed(1) == Math.abs(angle_sin).toFixed(1) && angle_sin < 0){
            angle = 360 - Math.abs(angle_sin)
            
        }
        else{
            angle = angle_cos
        }
        
        eye.style.transform = 'rotate(' + angle + 'deg)'

    });
}
