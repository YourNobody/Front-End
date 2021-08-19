const fs = require('fs');
const path = require('node:path');
const Boilerplate = require('./bp.boilerplate.js');

const JS = 'js';
const TS = 'ts';

const ext = process.argv.find((item) => item.split('=')[0] === 'ext' || item.split('=')[0] === 'E' || item.split('=')[0] === 'e') || null;
const fileExt = ext ? defineExtension(ext.split('=')[1]) : JS;

const IS_WITH_BOILERPLATE_VAR = process.argv.find((item) => item.split('=')[0] === 'default' || item.split('=')[0] === 'd' || item.split('=')[0] === 'D');
let IS_WITH_BOILERPLATE = !!IS_WITH_BOILERPLATE_VAR;

const NODE_COMPONENT = process.argv.find((item) => item.split('=')[0] === 'component' || item.split('=')[0] === 'c' || item.split('=')[0] === 'C');
const COMPONENT_NAME = NODE_COMPONENT.split('=')[1] ? NODE_COMPONENT.split('=')[1].split('').map((s, i) => {
  if (!i) s.toUpperCase();
  return s;
}).join('') : null;

const DIR_PATH = process.env.INIT_CWD || path.join(path.dirname(__dirname), 'components');
const UTF8 = 'utf-8';
const PROPS_NAME = COMPONENT_NAME + 'Props';

const boilerplate = new Boilerplate(fileExt, COMPONENT_NAME, PROPS_NAME);

function createComponent() {
  if (IS_WITH_BOILERPLATE && typeof IS_WITH_BOILERPLATE === 'string') {
    if (IS_WITH_BOILERPLATE === 'true') {
      IS_WITH_BOILERPLATE = true;
    }
    if (IS_WITH_BOILERPLATE === 'false') {
      IS_WITH_BOILERPLATE = false;
    }
  }
  try {
    if (!COMPONENT_NAME) return;
    const COMPONENT_FOLDER_NAME = path.join(DIR_PATH, COMPONENT_NAME);
    const files = [createFile.bind(null, path.join(COMPONENT_FOLDER_NAME, `${COMPONENT_NAME}.module.css`), null)];
    if (fileExt === JS) {
      files.push(
        createFile.bind(null, path.join(COMPONENT_FOLDER_NAME, `${COMPONENT_NAME}.${fileExt}x`), IS_WITH_BOILERPLATE ? boilerplate.jsx() : null)
      );
    } else {
      files.push(
        createFile.bind(null, path.join(COMPONENT_FOLDER_NAME, `${COMPONENT_NAME}.props.${fileExt}`), IS_WITH_BOILERPLATE ? boilerplate.props() : null)
      );
      files.push(
        createFile.bind(null, path.join(COMPONENT_FOLDER_NAME, `${COMPONENT_NAME}.${fileExt}x`), IS_WITH_BOILERPLATE ? boilerplate.tsx() : null)
      );
    }
    fs.mkdir(COMPONENT_FOLDER_NAME, function() {
      files.forEach(async (foo) => {
        await foo();
      })
      console.log(`Component ${COMPONENT_NAME} has been created!`);
    });
  } catch (error) {
    console.error(error);
  }
}

async function createFile(filePath, content) {
  try {
    const result = await fs.writeFile(filePath, content || '', UTF8, () => console.log(path.basename(filePath) + ' created'));
    return result;
  } catch (error) {
    console.error(error);
  }
}

createComponent();

function defineExtension(extension) {
  const ext = extension.trim();
  if (!ext) return JS;
  const jsNames = ['js', 'jsx', '.jsx', '.js', 'javascript'];
  const tsNames = ['ts', 'tsx', '.tsx', '.ts', 'typescript'];

  if (jsNames.includes(ext)) {
    return JS;
  } else if (tsNames.includes(ext)) {
    return TS;
  } else {
    return JS;
  }
}