# CLI Command Basics

XenForo allows add-ons to register custom CLI commands that can be executed using `cmd.php`.  
This is useful for tasks such as maintenance scripts, data imports, or background utilities.

## Creating Custom Command

To create a custom CLI command, you need to create a new PHP class within your add-on's directory structure.

### Command location
Commands must be placed in the following directory:
`src/addons/Vendor/Addon/Cli/Command/`

XenForo automatically discovers commands placed in the `Cli/Command` directory of any active add-on. You do not need to register them manually.

To see a list of all available commands, including your custom ones, run:
```bash
php cmd.php
```

### Command class
Your command class must extend `XF\Cli\Command\AbstractCommand`.

```php
namespace Vendor\Addon\Cli\Command;

use XF\Cli\Command\AbstractCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class Greet extends AbstractCommand
{
    // ...
}
```

### Configuring the Command

The `configure()` method is used to define the command's name, description, and any arguments or options it accepts.

```php
protected function configure(): void
{
    $this
        ->setName('vendor-addon:greet')
        ->setDescription('Greets the user with a message.')
        ->addArgument(
            'name',
            InputArgument::REQUIRED,
            'The name of the person to greet.'
        )
        ->addOption(
            'yell',
            'y',
            InputOption::VALUE_NONE,
            'If set, the greeting will be in uppercase.'
        );
}
```

*   **setName**: The unique name used to call the command (e.g., `php cmd.php vendor-addon:greet`). It is common practice to prefix custom commands with your add-on's ID or a unique vendor name.
*   **setDescription**: A short description shown in the command list.
*   **addArgument**: Defines a positional argument.
*   **addOption**: Defines a flag or value-based option (prefixed with `--`).

### Implementing Logic

The `execute()` method contains the logic that runs when the command is called.

```php
protected function execute(InputInterface $input, OutputInterface $output): int
{
    // Your logic here
    
    return 0; // Success
}
```

The method should return an integer:
*   `0`: Success
*   `1` (or any non-zero value): Failure

#### Input and Output
XenForo uses `SymfonyStyle` to provide a consistent look and feel for CLI output.

```php
use Symfony\Component\Console\Style\SymfonyStyle;

protected function execute(InputInterface $input, OutputInterface $output): int
{
    $io = new SymfonyStyle($input, $output);
    
    // Get input
    $name = $input->getArgument('name');
    $yell = $input->getOption('yell');
    
    // Logic
    $message = "Hello, $name!";
    if ($yell)
    {
        $message = strtoupper($message);
    }
    
    // Output information
    $io->title("Greeting");
    
    if (empty($name)) {
        $io->error("Something went wrong!");
        return 1;
    }
    
    // You can also use tables
    $io->table(['Field', 'Value'], [
        ['Name', $name],
        ['Yelling', $yell ? 'Yes' : 'No']
    ]);
    
    $io->success($message);
    return 0;
}
```

The output for this command would look like:
```
user@device:/var/www/html$ php cmd.php vendor-addon:greet TestName

Greeting
========

 --------- ------- 
Field     Value
 --------- ------- 
Name      Test
Yelling   No
 --------- ------- 

[OK] Hello, TestName!
```

```
user@device:/var/www/html$ php cmd.php vendor-addon:greet TestName --yell

Greeting
========

 --------- ------- 
Field     Value
 --------- ------- 
Name      Test   
Yelling   Yes
 --------- ------- 

[OK] HELLO, TESTNAME!
```

To produce an error we can change the argument `name` to use the mode `InputArgument::OPTIONAL` which will let use run the command without a name:
```
user@device:/var/www/html$ php cmd.php vendor-addon:greet

Greeting
========

[ERROR] Something went wrong!    
```