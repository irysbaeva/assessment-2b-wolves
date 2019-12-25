// const buttons = document.querySelector('.delete');

// buttons.forEach(item => {item.addEventListener('click', async(event) => {
//     console.log(buttons);
//     event.preventDefault();
//     event.stopPropagation();
//     // console.log(event.target.id);
//     await fetch(`/parties/${event.target.id}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             id: event.target.id,
//         })
//     });
//     window.location = '/parties';
// })});