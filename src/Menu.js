import React, { setState, useEffect, useState, formData } from "react"
import './Menu.css';
import { Dropdown } from 'primereact/dropdown';


const Menu = ({ isOpen, toggleMenu }) => {
	const [groups, setGroups] = useState([])
	const [selectedGroup, setSelectedGroup] = useState("")

	const [teachers, setTeachers] = useState([])
	const [selectedTeacher, setSelectedTeacher] = useState("")
	const [colour, setColour] = useState("#809edd")
	const [cabinet, setCabinet] = useState("")

	const [week, setWeek] = useState("числитель")

	const [timetable, setTimetable] = useState(["Нажмите кнопку фильтров в правом верхнем углу!"])

	const [error, setError] = useState([])

	async function getGroups(){
        const r = await fetch("https://petrsu.egipti.com/api/v2/groups")
        if (!r.ok)
            return
        const data = await r.json()
		setGroups(Object.keys(data))
    }

	async function getTeachers(){
        const r = await fetch("https://petrsu.egipti.com/api/v2/lecturers")
        if (!r.ok)
            return
        const data = await r.json()
		setTeachers(data)
    }

	useEffect(() => {
		getGroups();
	}, []);

	useEffect(() => {
		getTeachers()
	}, []);


	function Filters(){
		return <div className="MBody">
			<div className="dropdown">
				<label>Неделя: </label>
				<Dropdown 
				value={week} 
				onChange={(e) => setWeek(e.value)} 
				options={["числитель", "знаменатель"]}
				className="Teachers" />

			</div>
			<div className="dropdown">
				<label>Группа:</label>
				<input style={{flex:1}} value={selectedGroup} onChange={(event) => setSelectedGroup(event.target.value)} className="form-control" id="inputPassword" aria-describedby="errorPassword" />             
			</div>
			<div className="dropdown">
				<label>Преподаватель: </label>
				<Dropdown 
				value={selectedTeacher} 
				onChange={(e) => setSelectedTeacher(e.value)} 
				options={teachers}
				filter valueTemplate={selectedTeacher} 
				className="Teachers" />
			</div>

			<div className="dropdown">
				<label>Аудитория: </label>
				<input style={{flex:1}} value={cabinet} onChange={(event) => setCabinet(event.target.value)} className="form-control" id="inputPassword" aria-describedby="errorPassword" />             
			</div>
			<div className="dropdown">
				<label>Цвет: </label>
				<input type="color" value = {"#809edd"} onChange={(event) => setColour(event.target.value)} className="form-control" id="inputColor"/>             
			</div>

		</div>
	}



	function Process(){
		setError("")
		if (selectedGroup === "" && selectedTeacher === "" && cabinet === ""){
			setError("Выберите хоть что-то!")
		}
		else if (!groups.includes(selectedGroup) && !selectedGroup === ""){
			setError("Данной группы не существует!")
		}
		else{
			Do(selectedGroup, selectedTeacher, cabinet)
			toggleMenu()
		}
	}

	function getDayOfWeek(date) {
		const dateF = date.split(".").reverse().join("-")
		const dayOfWeek = new Date(dateF).getDay();    
		return isNaN(dayOfWeek) ? null : 
		  ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][dayOfWeek];
	  }

	async function Do(group, teacher, cab){
		setTimetable(["Идет поиск..."])
		let answer = []
		const w = week === "числитель"? "numerator": "denominator"
	
		const r = await fetch("https://petrsu.egipti.com/api/v2/schedule")
		if (!r.ok)
			return
		let lessons = await r.json()
		lessons = Object.values(lessons)
		for(let i = 0; i<lessons.length; i++){
			var les = lessons[i]
			const lesson_week = les[w]
			for(const ll of Object.values(lesson_week)){
				for (const lesson of ll)
				if ((lesson["lecturer"] === teacher || teacher === "") && (lesson["classroom"].includes(cab) || cab === "") && (lesson["group"] === group || group === "")){
					answer.push(lesson)
				}
			}
		}
		let jsx = []
		let previousDate = ""
		for(let i = 0; i < answer.length; i++){
			const l = answer[i]
			const weekday = getDayOfWeek(l["date"])
			let item = 
			<>
				{weekday != previousDate? <div className="weekday">{weekday}</div> : ""}
				<div style={{background: colour}} className="lesson" key={i}>
					<div className="lessonName" style={{marginBottom: 4}}>{l["number"]}. {l["title"]}</div>
					<div className="lessonLecturer" style={{marginBottom: 4}}>{l["lecturer"]}</div>
					<div className="one-row">
						<div className="times">
							<div className="time">{l["start_time"]}</div>
							<div className="time">{l["end_time"]}</div>
						</div>
						<div className="toright">
							<div className="group">{"Группа " + l["group"]}</div>
							<div className="classroom">{l["classroom"]}</div>
						</div>
					</div>
				</div>
			</>
			previousDate = weekday
			jsx.push(item)
		}
		setTimetable(jsx)
	}


	return (
		<>
		<div className={`menu ${isOpen ? 'open' : ''}`}>
			
			<button onClick={toggleMenu} class="btn-close">Закрыть меню</button>
			
			{Filters()}
			{error}
			<button onClick={() => {Process()}}>Применить</button>
			{/* Дополнительное содержимое меню */}
		</div>
		<div>{timetable}</div>
		</>
	);
};

export default Menu;