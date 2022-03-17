

import * as $ from 'jquery'
import Post from '@models/post.js'
import json from './assets/json.json'
import WebpackLogo from './assets/webpack-logo.png'
import xml from './assets/data.xml'
import React from 'react'
import { render } from "react-dom";
import './style/style.css'
import './style/styles.scss'
import  './babel.js'


const post = new Post('Webpack Post Title', WebpackLogo)
//const jqueryId = document.getElementById('jqueryId')
$('pre').addClass('code').html(post.toString)// не получилось вывов с jquery
// console.log('Post to String:', post.toString())

// console.log('JSON:', json);
// console.log('XML:', xml);
