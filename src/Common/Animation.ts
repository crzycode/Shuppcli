export const  startAnimation = ()=>{
    const frames = ['-', '\\', '|', '/']; // Frames for the animation
    let i = 0;

    const intervalId = setInterval(() => {
        // Clear the previous frame
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);

        // Print the current frame
        process.stdout.write(frames[i]);

        // Increment frame index
        i = (i + 1) % frames.length;
    }, 100); // Change the interval to control the speed of the animation

    return intervalId; // Return the interval ID
}