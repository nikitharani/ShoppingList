import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button} from 'react-bootstrap';

import ContentEditable from "react-contenteditable";
import { CSVLink, CSVDownload } from "react-csv";

// import { ArrowRight } from 'react-bootstrap-icons';    //my add

import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus, faChevronDown,faChevronUp, faTrash, faSave, faUpload, faRecycle } from '@fortawesome/free-solid-svg-icons';



const App = () => {
	// HINT: each "item" in our list names a name,
	// a boolean to tell if its been completed, and a quantity
	const [previous_items, setPreviousItems] = useState([
		{ itemName: 'Egg', isSelected: false },
		{ itemName: 'Milk', isSelected: false },
		{ itemName: 'Leaves', isSelected: false },
		{ itemName: 'Bread', isSelected: false },
		{ itemName: 'Butter', isSelected: false },
		{ itemName: 'Cereals', isSelected: false },

	]);

	const [current_items, setCurrentItems] = useState([
		{ itemName: 'Jam', isSelected: false },
		{ itemName: 'Apple', isSelected: false },
		{ itemName: 'Banana', isSelected: false },

	]);

	const [isRightArrow, setisRightArrow] = useState(true);
	const [isLeftArrow, setisLeftArrow] = useState(true);
	const [id_selected, setid_selected] = useState(0);

	const [inputValue, setInputValue] = useState('');

	const handleAddButtonClick = () => {
		const newItem = {
			itemName: capitalize(inputValue),
			quantity: 1,
			isSelected: false,
		};

		var addItem = true;

		// Make if the item already exists
		for (var i = 0; i < current_items.length; i++) {
			if (newItem.itemName === current_items[i].itemName){
			addItem = false;
			}
		}
		for (i = 0; i < previous_items.length; i++) {
			if (newItem.itemName === previous_items[i].itemName){
			addItem = false;
			}
		}
		const newItems = [...current_items, newItem];

		if (addItem){
			setCurrentItems(newItems);
			setInputValue('');
		}
		else
		{
			alert("Already exists!")
		}
	};


	const toggleCurrentComplete = (index) => {
		const newItems = [...current_items];

		newItems[index].isSelected = !newItems[index].isSelected;

		for (var i = 0; i < newItems.length; i++) {
			if (i !== index){
			newItems[i].isSelected = false;
			}

		}

		for (i = 0; i < previous_items.length; i++) {
				previous_items[i].isSelected = false;
		}
		setisRightArrow(true);
		setisLeftArrow(false);
		setid_selected(index);

		setCurrentItems(newItems);
	};

	const toggleCurrentEdit = (index,value) => {
		const newItems = [...current_items];
		newItems[index].itemName = value;

		setCurrentItems(newItems);
	};

	const toggleCurrentDelete = (index) => {
		const deletedItem = current_items[index]
		const newItems = current_items.filter((item) => item.itemName !== deletedItem.itemName);
 
		setCurrentItems(newItems);
	};

	const toggleClearList = () => {
		const newItems = []; 
		setCurrentItems(newItems);
	};

	// const toggleSaveList = () => {
	// 	const newItems = [...previous_items];
	// 	// <CSVDownload data={current_items} target="_blank" />;
	// 	<CSVLink data={newItems} />;


	// };

	const toggleLoadList = () => {
		const newItems = []; 
		setCurrentItems(newItems);
	};

	///////////////////////////////////////////////////////////////
	// Previous list functions
	///////////////////////////////////////////////////////////////
	const togglePreviousComplete = (index) => {
		const newItems = [...previous_items];

		newItems[index].isSelected = !newItems[index].isSelected;

		for (var i = 0; i < newItems.length; i++) {
			if (i !== index){
			newItems[i].isSelected = false;
			}
		}

		for (i = 0; i < current_items.length; i++) {
			current_items[i].isSelected = false;
		}

		setisRightArrow(false);
		setisLeftArrow(true);
		setid_selected(index);

		setPreviousItems(newItems);
	};

	const togglePreviousEdit = (index,value) => {
		const newItems = [...previous_items];
		newItems[index].itemName = value;

		setPreviousItems(newItems);
	};

	const togglePreviousDelete = (index) => {
		const deletedItem = previous_items[index]
		const newItems = previous_items.filter((item) => item.itemName !== deletedItem.itemName); 
		setPreviousItems(newItems);
	};

	const toggleRight = (index) => {
		const newItem = {
			itemName: current_items[index].itemName,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...previous_items, newItem];
		setPreviousItems(newItems);

		// delete the item in current list
		toggleCurrentDelete(index);
	};

	const toggleLeft = (index) => {
		const newItem = {
			itemName: previous_items[index].itemName,
			quantity: 1,
			isSelected: false,
		};

		const newItems = [...current_items, newItem];
		setCurrentItems(newItems);

		// delete the item in previous list
		togglePreviousDelete(index);
	};

	const toggleUp = (index) => {
		const newItems = [...current_items];

		if (index>0 && newItems.length>0){

			const originalitem = {
				itemName: current_items[index-1].itemName,
				quantity: 1,
				isSelected: false,
			};

			newItems[index-1].isSelected = true;
			newItems[index-1].itemName = current_items[index].itemName;
			setid_selected(index-1);

			newItems[index].isSelected = false;
			newItems[index].itemName = originalitem.itemName;
		}
		setCurrentItems(newItems);
	};

	const toggleDown = (index) => {
		const newItems = [...current_items];

		if (index >= 0 && index < newItems.length-1){

			const originalitem = {
				itemName: current_items[index+1].itemName,
				quantity: 1,
				isSelected: false,
			};

			newItems[index+1].isSelected = true;
			newItems[index+1].itemName = current_items[index].itemName;
			setid_selected(index+1);

			newItems[index].isSelected = false;
			newItems[index].itemName = originalitem.itemName;
		}
		setCurrentItems(newItems);
	};

	function capitalize(word) {
		return word[0].toUpperCase() + word.slice(1).toLowerCase();
	  }

	return (
    <div className="app-background">
      <div className="main-container">
        <h1>Current List</h1>
        <div className="add-item-box">
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-item-input"
            placeholder="Add an item..."
          />
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => handleAddButtonClick()}
          />
        </div>
        <div className="item-list">
          {current_items.map((item, index) => (
            <div className="item-container">
              <div className="item-name">
                {item.isSelected ? (
                  <>
				  <div className="sel-item">
					<div>
                    	<FontAwesomeIcon icon={faCheckCircle} onClick={() => toggleCurrentComplete(index)} />
                    	<span className="completed">
							<ContentEditable html={item.itemName} onChange={(event) => toggleCurrentEdit(index,event.target.value)}/>
						</span>
						<FontAwesomeIcon  icon={faTrash} onClick={() => toggleCurrentDelete(index)} />					
					</div>
				  </div>
                  </>
                ) : (
                  <>
				  <div onClick={() => toggleCurrentComplete(index)}>
                    <FontAwesomeIcon icon={faCircle}  />
                    <span>{item.itemName}</span>
					</div>
                  </>				  
                )}
              </div>
            </div>
          ))}
        </div>
		<div class="option-btn">
			<Button title="Save List"> <CSVLink data={current_items}><FontAwesomeIcon icon={faSave} /></CSVLink></Button>
			<Button title="Clear List" onClick={() => toggleClearList()}> <FontAwesomeIcon icon={faRecycle} /> </Button>
			<Button title="Load List"> <FontAwesomeIcon icon={faUpload} /> </Button>
		</div>
      </div>

      {/* my button */}
      <div className="btn-funct">
        <div className="lr">
          <Button id= "right-btn" disabled={isRightArrow}>
			  Right
            <FontAwesomeIcon icon={faChevronRight} onClick={() => toggleRight(id_selected)}/>			
		  </Button>
          <Button disabled={isLeftArrow}>
			  Left 
            <FontAwesomeIcon icon={faChevronLeft} onClick={() => toggleLeft(id_selected)} />
          </Button>
        </div>
        <div className="tb">
          <Button disabled onClick={() => toggleUp(id_selected)}>
		  Up
            <FontAwesomeIcon icon={faChevronUp}/>
          </Button>
          <Button disabled onClick={() => toggleDown(id_selected)}>
			  Down 
            <FontAwesomeIcon icon={faChevronDown}/>
          </Button>
        </div>
      </div>

      {/* my code */}
      <div className="main-container prev">
        <h1>Previous List</h1>
        <div className="item-list">
          {previous_items.map((item, index) => (
            <div className="item-container">
			<div className="item-name">
			  {item.isSelected ? (
				<>
				<div className="sel-item">
				  <div>
					  <FontAwesomeIcon icon={faCheckCircle} onClick={() => togglePreviousComplete(index)} />
					  <span className="completed">
						  <ContentEditable html={item.itemName} onChange={(event) => togglePreviousEdit(index,event.target.value)}/>
					  </span>
					  <FontAwesomeIcon  icon={faTrash} onClick={() => togglePreviousDelete(index)} />					
				  </div>
				</div>
				</>
			  ) : (
				<>
				<div onClick={() => togglePreviousComplete(index)}>
				  <FontAwesomeIcon icon={faCircle}/>
				  <span>{item.itemName}</span>
				</div>
				</>
			  )}
			</div>
		  </div>
		))}
        </div>
      </div>
    </div>
    //my code
  );
};

export default App;
