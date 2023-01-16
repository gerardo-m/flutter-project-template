# flutter-project-template README

Template and snippets for a medium size applications. This project is still in *BETA*

I am building this extension to support my own Flutter project structure,
from creating the initial setup to some snippets for repetitive tasks I have encountered
across multiple projects.

I may explain the project structure I use in the future if someone find this
useful or just need a guide on how to approach Flutter projects.

## Commands

| Command                        | Description                          |
| ------------------------------ | ------------------------------------ |
| `FP: Setup`                    | Initialize the application template  |
| `FP: New Screen`               | Creates an empty screen              |
| `FP: New Service`              | Creates an empty service             |
| `FP: New Repository`           | Creates an abstract repository       |
| `FP: New Firestore Repository` | Creates a basic firestore repository |

### Warning!!!

Only call the `FP: Setup` command when starting a new project, since it will overwrite your main.dart and pubspec.yaml files.

## Snippets

| Snippet            | Description                                |
| ------------------ | ------------------------------------------ |
| `fpsimpleroute`    | Creates a static method for route handling |

## Known Issues

None for the moment.

## Release Notes

### 0.3.0

- Added Template for base repositories
- Added Template for firestore repositories
- Added Template for base services
- Fixed missing import of the dependency_injection file in the Setup template

### 0.2.1

- Fixed fpsimpleroute snippet not found

### 0.2.0

- Added New Screen command
- Added fpsimpleroute snippet

### 0.1.2

- Fixed missing dependencies

### 0.1.0

- Initial release of Flutter Project Template

---