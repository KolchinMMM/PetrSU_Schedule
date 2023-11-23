import logo from './logo.svg';
import './App.css';


function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

function ShowFilterMenu(){

}

function FilterMenu(){
	return{}
}

let counter = 0;
function MenuSandwich(){
	return(
	<div className="SandwichMenu" onClick={ShowFilterMenu}>
		<div></div>
		<div></div>
		<div></div>
	</div>
	);
}

function Main() {
	return (
		<div className="Main">
			Навал говна
			<MenuSandwich />
		</div>

	);
}

export default Main;
