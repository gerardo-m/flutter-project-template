"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPubspecFileContent = exports.getMainFileContent = exports.getDiFileContent = exports.getThemeFileContent = exports.getRouteHandlingFileContent = exports.getRoutesFileContent = exports.getViewsBarrelFileContent = exports.getHomeScreenContent = void 0;
const changeCase = require("change-case");
function getHomeScreenContent(projectName) {
    const pascalProjectName = changeCase.pascalCase(projectName);
    return `import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget{
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('${pascalProjectName}'),
      ),
      body: ListView(

      ),
    );
  }
}
  `;
}
exports.getHomeScreenContent = getHomeScreenContent;
function getViewsBarrelFileContent() {
    return `export 'home/home_screen.dart';`;
}
exports.getViewsBarrelFileContent = getViewsBarrelFileContent;
function getRoutesFileContent(projectName) {
    const pascalProjectName = changeCase.pascalCase(projectName);
    return `class ${pascalProjectName}Routes{

  static const home = '/';
}
  `;
}
exports.getRoutesFileContent = getRoutesFileContent;
function getRouteHandlingFileContent(projectName) {
    const pascalProjectName = changeCase.pascalCase(projectName);
    return `import 'package:${projectName}/utils/routes.dart';
import 'package:${projectName}/views/views.dart';
import 'package:flutter/material.dart';

class ${pascalProjectName}RouteHandling{

  static Route<dynamic>? onGenerateRoute(RouteSettings settings){
    switch (settings.name) {
      case ${pascalProjectName}Routes.home:
        return _goHome(settings);
      default:
        return MaterialPageRoute(
          builder: (context) {
            return const Scaffold(
              body: Center(child: Text('Route not Found')),
            );
          },
        );
    }
  }

  static Route<dynamic> _goHome(RouteSettings settings){
    return MaterialPageRoute(
      builder: (context){
        return const HomeScreen();
      }
    );
  }
}
  `;
}
exports.getRouteHandlingFileContent = getRouteHandlingFileContent;
function getThemeFileContent(projectName) {
    const pascalProjectName = changeCase.pascalCase(projectName);
    return `import 'package:flutter/material.dart';

class ${pascalProjectName}Theme{

  static const lightColorScheme = ColorScheme(
    brightness: Brightness.light,
    primary: Color(0xFF006C52),
    onPrimary: Color(0xFFFFFFFF),
    primaryContainer: Color(0xFF82F8CE),
    onPrimaryContainer: Color(0xFF002117),
    secondary: Color(0xFF4C6359),
    onSecondary: Color(0xFFFFFFFF),
    secondaryContainer: Color(0xFFCEE9DB),
    onSecondaryContainer: Color(0xFF082018),
    tertiary: Color(0xFF9A4521),
    onTertiary: Color(0xFFFFFFFF),
    tertiaryContainer: Color(0xFFFFDBCE),
    onTertiaryContainer: Color(0xFF370E00),
    error: Color(0xFFBA1A1A),
    errorContainer: Color(0xFFFFDAD6),
    onError: Color(0xFFFFFFFF),
    onErrorContainer: Color(0xFF410002),
    background: Color(0xFFFBFDF9),
    onBackground: Color(0xFF191C1A),
    surface: Color(0xFFFBFDF9),
    onSurface: Color(0xFF191C1A),
    surfaceVariant: Color(0xFFDBE5DE),
    onSurfaceVariant: Color(0xFF404944),
    outline: Color(0xFF707974),
    onInverseSurface: Color(0xFFEFF1EE),
    inverseSurface: Color(0xFF2E312F),
    inversePrimary: Color(0xFF65DBB3),
    shadow: Color(0xFF000000),
    surfaceTint: Color(0xFF006C52),
  );
  
  static const darkColorScheme = ColorScheme(
    brightness: Brightness.dark,
    primary: Color(0xFF65DBB3),
    onPrimary: Color(0xFF003829),
    primaryContainer: Color(0xFF00513D),
    onPrimaryContainer: Color(0xFF82F8CE),
    secondary: Color(0xFFB2CCC0),
    onSecondary: Color(0xFF1E352C),
    secondaryContainer: Color(0xFF344C42),
    onSecondaryContainer: Color(0xFFCEE9DB),
    tertiary: Color(0xFFFFB599),
    onTertiary: Color(0xFF5A1C00),
    tertiaryContainer: Color(0xFF7B2F0B),
    onTertiaryContainer: Color(0xFFFFDBCE),
    error: Color(0xFFFFB4AB),
    errorContainer: Color(0xFF93000A),
    onError: Color(0xFF690005),
    onErrorContainer: Color(0xFFFFDAD6),
    background: Color(0xFF191C1A),
    onBackground: Color(0xFFE1E3E0),
    surface: Color(0xFF191C1A),
    onSurface: Color(0xFFE1E3E0),
    surfaceVariant: Color(0xFF404944),
    onSurfaceVariant: Color(0xFFBFC9C3),
    outline: Color(0xFF89938D),
    onInverseSurface: Color(0xFF191C1A),
    inverseSurface: Color(0xFFE1E3E0),
    inversePrimary: Color(0xFF006C52),
    shadow: Color(0xFF000000),
    surfaceTint: Color(0xFF65DBB3),
  );

  static ThemeData get lightTheme {
    return ThemeData(
      colorScheme: lightColorScheme,
    );
  }

  static ThemeData get darkTheme {
    return ThemeData(
      colorScheme: darkColorScheme,
    );
  }
}
  `;
}
exports.getThemeFileContent = getThemeFileContent;
function getDiFileContent() {
    return `import 'package:flutter/material.dart';
import 'package:get_it/get_it.dart';

final di = GetIt.instance;

/// Use this method to register singletons and other services
/// for your app, e.g. Firebase, ads
Future<bool?> setup() async{
  WidgetsFlutterBinding.ensureInitialized();

  // Register your services here
  return true;
}
  `;
}
exports.getDiFileContent = getDiFileContent;
function getMainFileContent(projectName) {
    const pascalProjectName = changeCase.pascalCase(projectName);
    return `import 'package:flutter/material.dart';
import 'package:${projectName}/utils/theme.dart';
import 'package:${projectName}/utils/route_handling.dart';

import 'dependency_injection.dart' as di;

  void main() async{
    await di.setup();
    runApp(const MyApp());
  }
  
  class MyApp extends StatelessWidget {
    const MyApp({super.key});
  
    // This widget is the root of your application.
    @override
    Widget build(BuildContext context) {
      return MaterialApp(
        title: 'Flutter Project Demo',
        theme: ${pascalProjectName}Theme.lightTheme,
        darkTheme: ${pascalProjectName}Theme.darkTheme,
        onGenerateRoute: ${pascalProjectName}RouteHandling.onGenerateRoute,
      );
    }
  }`;
}
exports.getMainFileContent = getMainFileContent;
function getPubspecFileContent(projectName) {
    return `name: ${projectName}
description: A new Flutter project.

# The following line prevents the package from being accidentally published to
# pub.dev using \`flutter pub publish\`. This is preferred for private packages.
publish_to: 'none' # Remove this line if you wish to publish to pub.dev

# The following defines the version and build number for your application.
# A version number is three numbers separated by dots, like 1.2.43
# followed by an optional build number separated by a +.
# Both the version and the builder number may be overridden in flutter
# build by specifying --build-name and --build-number, respectively.
# In Android, build-name is used as versionName while build-number used as versionCode.
# Read more about Android versioning at https://developer.android.com/studio/publish/versioning
# In iOS, build-name is used as CFBundleShortVersionString while build-number is used as CFBundleVersion.
# Read more about iOS versioning at
# https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html
# In Windows, build-name is used as the major, minor, and patch parts
# of the product and file versions while build-number is used as the build suffix.
version: 1.0.0+1

environment:
  sdk: '>=2.18.2 <3.0.0'

# Dependencies specify other packages that your package needs in order to work.
# To automatically upgrade your package dependencies to the latest versions
# consider running \`flutter pub upgrade --major-versions\`. Alternatively,
# dependencies can be manually updated by changing the version numbers below to
# the latest version available on pub.dev. To see which dependencies have newer
# versions available, run \`flutter pub outdated\`.
dependencies:
  flutter:
    sdk: flutter
  get_it: ^7.2.0


  # The following adds the Cupertino Icons font to your application.
  # Use with the CupertinoIcons class for iOS style icons.
  cupertino_icons: ^1.0.2

dev_dependencies:
  flutter_test:
    sdk: flutter

  # The "flutter_lints" package below contains a set of recommended lints to
  # encourage good coding practices. The lint set provided by the package is
  # activated in the \`analysis_options.yaml\` file located at the root of your
  # package. See that file for information about deactivating specific lint
  # rules and activating additional ones.
  flutter_lints: ^2.0.0

# For information on the generic Dart part of this file, see the
# following page: https://dart.dev/tools/pub/pubspec

# The following section is specific to Flutter packages.
flutter:

  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true

  # To add assets to your application, add an assets section, like this:
  # assets:
  #   - images/a_dot_burr.jpeg
  #   - images/a_dot_ham.jpeg

  # An image asset can refer to one or more resolution-specific "variants", see
  # https://flutter.dev/assets-and-images/#resolution-aware

  # For details regarding adding assets from package dependencies, see
  # https://flutter.dev/assets-and-images/#from-packages

  # To add custom fonts to your application, add a fonts section here,
  # in this "flutter" section. Each entry in this list should have a
  # "family" key with the font family name, and a "fonts" key with a
  # list giving the asset and other descriptors for the font. For
  # example:
  # fonts:
  #   - family: Schyler
  #     fonts:
  #       - asset: fonts/Schyler-Regular.ttf
  #       - asset: fonts/Schyler-Italic.ttf
  #         style: italic
  #   - family: Trajan Pro
  #     fonts:
  #       - asset: fonts/TrajanPro.ttf
  #       - asset: fonts/TrajanPro_Bold.ttf
  #         weight: 700
  #
  # For details regarding fonts from package dependencies,
  # see https://flutter.dev/custom-fonts/#from-packages
  `;
}
exports.getPubspecFileContent = getPubspecFileContent;
//# sourceMappingURL=setup.template.js.map