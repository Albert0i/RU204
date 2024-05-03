// Read the command-line arguments
const args = process.argv.slice(2);

// Check if arguments are provided
if (args.length === 0) {
  console.log('No arguments provided.');
} else {
  // Iterate over the arguments
  console.log('Arguments:');
  args.forEach((arg, index) => {
    console.log(`[${index}]: ${arg}`);
  });
}
