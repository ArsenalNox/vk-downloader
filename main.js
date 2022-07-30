function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var allImages = []
var counter = 0
var listener 
var stop = false
var sameImageCounter = 0
var totalImagesMissed = 0

document.addEventListener('keydown', (e)=>{
	if (e.keyCode == 81){
		stop = true
	}
})

while(true){
	await Photoview.show(false, cur.pvIndex + 1, event);
	if (stop) {
		console.log('Stopping')
		break
	}
	console.log(`Saving photo ${counter}`)
	let photo = document.getElementById('pv_photo').firstChild.src
	if (!allImages.includes(photo)){
		allImages.push(photo)
		sameImageCounter = 0
	} else {
		sameImageCounter++
		totalImagesMissed++
		console.log('Image already saved...')
		await sleep(500)

		let new_photo = document.getElementById('pv_photo').firstChild.src
		if (!allImages.includes(new_photo)){
			allImages.push(new_photo)
		} else {
			console.log('IDK')
		}
	}
	counter++
	if (sameImageCounter > 10){
		console.log('Several duplicate images in a row. Stopping');
		break
	}
	await sleep(100)
}
alert('Download complete!')
console.log(`Total images missed: ${totalImagesMissed}`)
console.log(JSON.stringify(allImages))

const csvContent = allImages
  .join("\n");

const blob = new Blob([csvContent], {
  type: 'text;charset=utf-8;'
});

const url = URL.createObjectURL(blob);
const link = document.createElement("a");
link.setAttribute("href", url);
link.setAttribute("download", "data.txt");
document.body.appendChild(link);
link.click()
URL.revokeObjectURL(link.href)