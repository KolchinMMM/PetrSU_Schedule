import React, { useState } from 'react'
import Header from './Header'
import Menu from './Menu'
import Body from './Body.js'

const App = () => {
const [isOpen, setIsOpen] = useState(false);

const toggleMenu = () => {
	setIsOpen(!isOpen);
};

return (
	<div className = "Main">
		<Header toggleMenu={toggleMenu} />
		<Menu isOpen={isOpen} toggleMenu={toggleMenu} />
		{/* Дополнительное содержимое страницы */}
	</div>
	);
};

export default App;