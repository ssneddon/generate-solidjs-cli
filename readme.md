# Generate SolidJS CLI

[![License](https://img.shields.io/npm/l/express.svg)](https://github.com/ssneddon/generate-solidjs-cli/blob/main/LICENSE)

## Credit

This is based entirely on [arminbro's](https://github.com/arminbro) - [generate-react-cli](https://github.com/arminbro/generate-react-cli) cli tool.
I have made additions/edits to the code to specifically target the [SolidJS](https://www.solidjs.com/) library.

## Why?

To help speed up productivity in SolidJS projects and stop copying, pasting, and renaming files each time you want to create a new component.

## Table of Contents:

- [Config file](#config-file)
- [Generate components](#generate-components)
- [Custom component types](#custom-component-types)
- [Custom component templates](#custom-component-templates)
- [Custom component files](#custom-component-files)
- [Custom component directory](#custom-component-directory)

## You can run it using npx like this:

```
  npx generate-solidjs-cli component Box
```

_([npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+)_

## Config File

When you run GSC within your project the first time, it will ask you a series of questions to customize the cli for your project needs (this will create a "generate-solidjs-cli.json" config file).

#### Example of the **generate-solidjs-cli.json** config file:

```json
{
  "usesTypeScript": true,
  "usesCssModule": true,
  "cssPreprocessor": "scss",
  "component": {
    "default": {
      "path": "src/components",
      "withStyle": true,
      "withTest": true,
      "withModel": true
    }
  }
}
```

## Generate Components

```sh
  npx generate-solidjs-cli component Box
```

This command will create a folder with your component name within your default (e.g. **src/components**) directory, and its corresponding files.

#### Example of the component files structure:

```
|-- /src
    |-- /components
        |-- /Box
            |-- Box.tsx
            |-- Box.module.css
            |-- Box.module.css.d.ts
            |-- Box.test.tsx

```

### Options

You can also override some of the GSC component config rules using one-off commands. So for example, let's say you have set **withTest** to be `true` in the `component.default` property. You can override it like this:

```sh
  npx generate-solidjs-cli component Box --withTest=false
```

Or vice versa, if you have set **withTest** to be `false` you can do this:

```sh
  npx generate-solidjs-cli component Box --withTest=true
```

Otherwise, if you don't pass any options, it will just use the default values that you have set in the GSC config file under `component.default`.

<table>
  <tr align="left">
    <th>Options</th>
    <th>Description</th>
    <th>Value Type</th>
    <th>Default Value</th>
  </tr>

  <tr>
    <td width="20%"><b>--path</b></td>
    <td width="60%">
      Value of the path where you want the component to be generated in (e.g. <b>src/components</b>).
    </td>
    <td width="20%">String</td>
    <td width="20%"><code>component.default.path<code></td>
  </tr>

  <tr>
    <td width="20%"><b>--type</b></td>
    <td width="60%">
      You can pass a custom component type that you have configured in the GSC config file that has its own set of component config rules. Read more about <a href="#custom-component-types">custom component types</a>.
    </td>
    <td width="20%">String</td>
    <td width="20%"><code>component.default<code></td>
  </tr>

  <tr>
    <td width="20%"><b>--withStyle</b></td>
    <td width="60%">
      Creates a corresponding stylesheet file with this component.
    </td>
    <td width="20%">Boolean</td>
    <td width="20%"><code>component.default.withStyle<code></td>
  </tr>

   <tr>
    <td width="20%"><b>--withModel</b></td>
    <td width="60%">
      Creates a corresponding css type model file with this component.
    </td>
    <td width="20%">Boolean</td>
    <td width="20%"><code>component.default.withModel<code></td>
  </tr>

  <tr>
    <td width="20%"><b>--withTest</b></td>
    <td width="60%">
      Creates a corresponding test file with this component.
    </td>
    <td width="20%">Boolean</td>
    <td width="20%"><code>component.default.withTest<code></td>
  </tr>

  <tr>
    <td width="20%"><b>--dry-run</b></td>
    <td width="60%">
      Show what will be generated without writing to disk
    </td>
    <td width="20%">Boolean</td>
    <td width="20%"><code>false<code></td>
  </tr>

  <tr>
    <td width="20%"><b>--flat</b></td>
    <td width="60%">
      Generate the files in the mentioned path instead of creating new folder for it
    </td>
    <td width="20%">Boolean</td>
    <td width="20%"><code>false<code></td>
  </tr>

  <tr>
    <td width="20%"><b>--customDirectory</b></td>
    <td width="60%">
      Template value that overrides the name of the directory of the component to be generated in.<br />
      See more under <a href="#custom-component-directory">custom component directory</a>.
    </td>
    <td width="20%">String</td>
    <td width="20%"><code>null</code></td>
  </tr>
</table>

### Custom component types

By default, GSC will use the `component.default` configuration rules when running the component command out of the box.

What if you wanted to generate other types of components that have their own set of config rules (e.g., **page** or **layout**)?

You can do so by extending the **generate-solidjs-cli.json** config file like this.

```json
{
  "usesTypeScript": true,
  "usesCssModule": true,
  "cssPreprocessor": "scss",
  "component": {
    "default": {
      "path": "src/components",
      "withStyle": true,
      "withModel": true,
      "withTest": true
    },
    "page": {
      "path": "src/pages",
      "withStyle": true,
      "withTest": true
    },
    "layout": {
      "path": "src/layout",
      "withStyle": false,
      "withTest": true
    }
  }
}
```

Now you can generate a component with your custom component types like this:

```sh
  npx generate-solidjs-cli component HomePage --type=page
```

```sh
  npx generate-solidjs-cli component BoxLayout --type=layout
```

You can also pass the same [options](#options) to your custom component types as you would for the default component type.

### Custom component templates

You can also create your own custom templates that GSC can use instead of the built-in templates that come with it. We hope this will provide more flexibility for your components that you want to generate.

There is an optional `customTemplates` object that you can pass to the `component.default` or any of your custom component types within your **generate-solidjs-cli.json** config file.

#### Example of the `customTemplates` object:

```json
"customTemplates": {
  "component": "templates/TemplateName.js",
  "style": "templates/TemplateName.style.scss",
  "test":  "templates/TemplateName.test.js"
},
```

The keys represent the type of file, and the values are the paths that point to where your custom template lives in your project/system. Please note the `TemplateName` keyword in the template filename. GSC will use this keyword and replace it with your component name (in whichever format you typed the component name in the command) as the filename.

#### Example of using the `customTemplates` object within your generate-solidjs-cli.json config file:

```json
{
  "usesTypeScript": true,
  "usesCssModule": true,
  "cssPreprocessor": "scss",
  "component": {
    "default": {
      "customTemplates": {
        "component": "templates/component/TemplateName.js",
        "style": "templates/component/TemplateName.style.scss",
        "test": "templates/component/TemplateName.test.js"
      },
      "path": "src/components",
      "withStyle": true,
      "withTest": true
    },
    "page": {
      "customTemplates": {
        "test": "templates/page/TemplateName.test.js"
      },
      "path": "src/pages",
      "withStyle": true,
      "withTest": true
    }
  }
}
```

Notice in the `page.customTemplates` that we only specified the `test` custom template type. That's because all the custom template types are optional. If you don't set the other types, GSC will default to using the built-in templates it comes with.

#### Example of a custom component template file: // start here determine if we need context

```jsx
// templates/component/TemplateName.js

import styles from './TemplateName.module.css';

export const TemplateName = (props) => {
  return <></>;
};
```

**Important** - You can also use the following keywords within your custom templates to format the component name in your templates accordingly:

| Keyword         | Replacement                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------- |
| `templatename`  | component name in raw case (whichever format the user typed the component name in the command) |
| `TemplateName`  | component name in PascalCase                                                                   |
| `templateName`  | component name in camelCase                                                                    |
| `template-name` | component name in kebab-case                                                                   |
| `template_name` | component name in snake_case                                                                   |
| `TEMPLATE_NAME` | component name in uppercase SNAKE_CASE                                                         |

#### Example of a custom test template file:

```jsx
// templates/component/TemplateName.test.js

import { render } from '@solidjs/testing-library';
import { TemplateName } from './TemplateName';

describe('tests for TemplateName', () => {
  it('***TEST***', () => {
    render(() => <TemplateName />);
  });
});
```

### Custom component files

GSC comes with corresponding built-in files for a given component if you need them (i.e., `withStyle`, `withTest`, and `withModel`).

What if you wanted to add custom files of your own?

For example, let's say you wanted to add an `index.js` file for each component, so you don't have to add the additional component name with each import (i.e., `import Box from './components/Box'` instead of `import Box from './components/Box/Box'`).

Or maybe you need a context file for your component.

You can do so by editing your **generate-solidjs-cli.json** config file like so.

```json
{
  "usesTypeScript": false,
  "usesCssModule": false,
  "cssPreprocessor": "css",
  "component": {
    "default": {
      "path": "src/components",
      "withStyle": true,
      "withTest": true,
      "withIndex": true,
      "withContext": true,
      "customTemplates": {
        "index": "templates/index.js",
        "context": "templates/TemplateName.context.js"
      }
    }
  }
}
```

```jsx
// templates/default/index.js

export { default } from './TemplateName';
```

```jsx
// templates/default/TemplateName.context.js

import { createContext, useContext } from 'solid-js';

const TemplateNameContext = createContext();

export function TemplateNameProvider(props) {
  return <TemplateNameContext.Provider>{props.children}</TemplateNameContext.Provider>;
}

export function useTemplateName() {
  return useContext(TemplateNameContext);
}
```

In this case, we added a `withIndex` & `withContext` to the `component.default`. Note: You can add custom files to any of your custom component types.

You should also see that we added `index` and `context` to our `customTemplates` object. That's because custom files require custom templates. Otherwise, you will get an error when you generate a component.

Also, we used the `TemplateName` keyword for the `context` custom file. GSC will generate this corresponding file and replace `TemplateName` with the component name.

### Custom component directory

Using the `customDirectory` you can easily override the directory name for the component generated. For instance, if prefixes are required for particular components or if template names will be mixed, the `customDirectory` option will allow you to override the way that GSC generates the name of the directory where the component files will live.

The `customDirectory` directive allows all supported casings (see previous section) and can be overridden at the following levels in ascending specific of priority:

- top
- component.default
- component._type_
- CLI

#### Example:

For Solidjs Context Providers in a project, the decision has been made to separate Context generation from the visual components.

In a typical configuration the configuration would look as following:

```json
{
  "provider": {
    "path": "src/components/providers",
    "withStyle": false,
    "withTest": true,
    "withContext": true,
    "customTemplates": {
      "component": "templates/provider/TemplateName.tsx",
      "context": "templates/provider/TemplateName.context.ts",
      "test": "templates/provider/TemplateName.test.tsx"
    }
  }
}
```

With the configuration above, the component would be required to either follow a full or a minimalistic naming convention.
I.e. the component would either need to be generated as `ThemeProvider` and consequently the context name would be generated as `ThemeProviderContext`, or by renaming the files and templates as `TemplateNameProvider` but with the downside of the component path being generated as `src/components/providers/Theme`. This creates inconsistent naming in the directory containg the component files.

To work around this, the `customDirectory` option can be used to enforce a particular style.

```json
{
  ...
  "provider": {
    "path": "src/components/providers",
      "withStyle": false,
      "withTest": true,
      "withContext": true,
      "customDirectory": "TemplateNameProvider",
      "customTemplates": {
          "component": "templates/provider/TemplateNameProvider.tsx",
          "context": "templates/provider/TemplateName.context.ts",
          "test": "templates/provider/TemplateNameProvider.test.tsx"
      }
  }
  ...
}
```

The above configuration would allow you to mix and match different template names and keep naming consistent.

If we executed GSC with the above configuration (`npx generate-solidjs-cli component Theme --type=provider`), the result would look like this:

```fs
src/components/providers/ThemeProvider/Theme.context.ts
src/components/providers/ThemeProvider/ThemeProvider.tsx
src/components/providers/ThemeProvider/ThemeProvider.test.tsx
```

Similarly, this construct could be used as a shortcut for generating other named components, like the `BoxLayout` example above, depending on that could be shortened to:

```sh
  npx generate-solidjs-cli component Box --type=layout --customDir=TemplateNameLayout
```

Or it could be used to generate files with a naming convention with `Test`, `Context`, `Theme`, or `Provider` suffixes. Or even combined with skeleton CSS

## License

Generate Solidjs CLI is an open source software [licensed as MIT](// TODO replace license link).
