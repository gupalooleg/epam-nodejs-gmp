# EPAM Node.js global mentoring program Q3-Q4 2024

## Practical task

Let's write our simplified version of the `top` CLI utility program. It provides a dynamic real-time view of the running system. Usually, this command shows the summary information of the system and the list of processes or threads currently managed by the \*nix kernel. Our goal is to show the most CPU-intensive process that's running on the system.

## Acceptance criteria

1. All code must be contained inside a function, which by default is exported from the `activity-monitor.ts` file inside the `src` folder and launched in the main `index.ts` file.
2. Program uses system shell command output (see Hints) to retrieve process name, CPU, and memory usage details.
3. Refresh rate is ten times per second.
4. The program uses only the standard library; third-party modules are prohibited (except those already defined in the homework template).
5. Each update will _NOT_ start from the new line. It is always displayed only in one row.
6. Once per minute program appends the output to the log file `activityMonitor.log` in the format `<unixtime> : <process info>`. If the file doesn't exist - the program creates it.
7. Program supports `Linux`, `macOS`, and `Windows` operating systems.
8. When the unsupported platform occurs it should log the `Unsupported platform` message to the `stderr` and exit from the program with the status code `1`.

## Evaluation criteria

| Criteria                                                                                              | Coefficient |
| ----------------------------------------------------------------------------------------------------- | ----------- |
| Only standard library is used.                                                                        | 1           |
| System command (from Hints) is used to retrieve process name, CPU, and memory usage for:              |             |
| - Linux                                                                                               | 1           |
| - Windows                                                                                             | 1           |
| - macOS                                                                                               | 1           |
| Refresh rate is 10 times per second.                                                                  | 2           |
| Command output is appends to `activityMonitor.log` file every 1 minute.                               | 2           |
| Each update (command output) is not starting from the new line.                                       | 2           |
| Program exits with status code `1` and the corresponding message in case of the unsupported platform. | 2           |

## Hints

System commands to retrieve the process:

- **Unix-like OS** `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`
- **Windows** `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
- Carriage return escape sequence is `\r`
