import React from 'react';
import 'whatwg-fetch';
import './App.css';

const urls = [
  'https://raw.githubusercontent.com/jenkinsci/blueocean-plugin/3a69c280f841f75ea8c8eede6fa6de65c85d35f1/blueocean-dashboard/src/main/resources/jenkins/plugins/blueocean/dashboard/Messages_ko.properties',
  'https://raw.githubusercontent.com/jenkinsci/blueocean-plugin/3a69c280f841f75ea8c8eede6fa6de65c85d35f1/blueocean-personalization/src/main/resources/jenkins/plugins/blueocean/personalization/Messages_ko.properties',
  'https://raw.githubusercontent.com/jenkinsci/blueocean-plugin/3a69c280f841f75ea8c8eede6fa6de65c85d35f1/blueocean-pipeline-editor/src/main/resources/jenkins/plugins/blueocean/pipeline/editor/Messages_ko.properties',
  'https://raw.githubusercontent.com/jenkinsci/blueocean-plugin/3a69c280f841f75ea8c8eede6fa6de65c85d35f1/blueocean-rest-impl/src/main/resources/io/jenkins/blueocean/service/embedded/Messages_ko.properties',
	'https://raw.githubusercontent.com/jenkinsci/blueocean-plugin/3a69c280f841f75ea8c8eede6fa6de65c85d35f1/blueocean-web/src/main/resources/jenkins/plugins/blueocean/web/Messages_ko.properties'
]

const codesToStr = (str) => str.replace(/\\u([a-zA-Z0-9]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1,16)))

const displayUrl = (str) => str.replace(/https:\/\/raw.githubusercontent.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9]+\//, '');

//const urlEncode = (str) => {
//  var buf = [];

//  for (var i=str.length-1;i>=0;i--) {
//    buf.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
//  }

//  return buf.join('');
//}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { };
    this.onClick = (url) => {
      return (e) => {
        e.preventDefault();
        this.setState({ selectedUrl: url })
      }
    };
	}

  componentDidMount() {
		urls.forEach(url => {
			fetch(url)
				.then(response => response.text())
				.then(data => this.setState({ [url]: data }));
		})
  }
  render() {
    const str = codesToStr((this.state.selectedUrl ? this.state[this.state.selectedUrl] : null) || this.state[urls[0]] || '');
		return (
			<div>
				<ul>
          {urls.map(url => <li key={url}><a href="/" onClick={this.onClick(url)}>{displayUrl(url)}</a></li>)}
        </ul>
        <pre dangerouslySetInnerHTML={{__html: str}} />
      </div>
    )
    // return ( <div dangerouslySetInnerHTML={{__html: urlEncode(str)}} />);
    // return <div>{str}</div>
  }
}

export default App;
