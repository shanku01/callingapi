import './App.css';
import React from 'react';
import axios from 'axios';

 class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            submitData:{
            name:"",
            email:"",
            dateOfBirth:'',
            phoneNumber:'',
            salary:'',
            department: ""},       
        }
        this.onSearch = this.onSearch.bind(this);
        this.onDelete= this.onDelete.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCall = this.onCall.bind(this);
        this.onInput=this.onInput.bind(this);
    }

    componentDidMount(){
        this.onCall();
    }

    onCall(){
        axios.get("http://localhost:3030/employee")
        .then(fetchedData=>{
            this.setState({data:fetchedData.data})
            console.log(this.state.data);
        })
        .catch(err=>{
            alert("Check your internet, We are unable to load data", err);
        });
    }

    onSearch(e){
        e.preventDefault();
        var temp =e.target.value;
        const data0 = this.state.data;
        if(temp!=null) this.setState({data:this.state.data.filter(x => !x.userId.indexOf(temp))});
        else this.setState({data:data0})
    }

    onInput(e,key){
        e.preventDefault();
        var temp =e.target.value;
        switch(key){
            case 'name': this.setState({submitData:{
                name:temp}});
                break;
            case 'email': this.setState({submitData:{
                email:temp}});
                break;
            case 'dateOfBirth': this.setState({submitData:{
                dateOfBirth:temp}});
                break;
            case 'phoneNumber': this.setState({submitData:{
                phoneNumber:temp}});
                break;
            case 'salary': this.setState({submitData:{
                salary:temp}});
                break;
            case 'department': this.setState({submitData:{
                department:temp}});
                break;
            default:
                alert("Please check for your input");         
            }
        }

    onSubmit(){
        axios.post("url",this.state.submitData)
        .then(fetchedData=>{
            alert("Data submitted!!")
        })
        .catch(err=>{
            alert("Check for the data, We got some error!",err)
        });
    }

    onDelete(key){
        key.preventDefault();
        axios.delete("url/"+this.state.data[key].id)
        .then(fetchedData=>{
            alert("Data Deleted!!")
            this.onCall();
        })
        .catch(err=>{
            alert("We got some error, please try again in some time!",err)
        });
    }

    render(){
    return ( 
    <div>
        <div className="header">
        <h1 className="heading">Emplooyees</h1>
        </div>
        <div className="filter">
        <p>Enter Id to Serach the the Emplooyee</p>
        <input onChange={e=>{this.onSearch(e)}}/>
        </div>
        <div>
            <table className="tableData">
            <th> <td>Name</td>
                    <td>Email</td>
                    <td>Date of Birth</td>
                    <td>Phone Number</td>
                    <td>Salart</td>
                    <td>Department</td>
                    <td>Action</td>
                    </th>
                    <th>
                    <td><input placeholder="Name" value="name" onChange={(e,value)=>{this.onInput(e,value)}}/></td>
                    <td><input placeholder="Email" value="email" onChange={(e,value)=>{this.onInput(e,value)}}/></td>
                    <td><input placeholder="Date of Birth" value="dateOfBirth" onChange={(e,value)=>{this.onInput(e,value)}}/></td>
                    <td><input placeholder="Phone Number" value="phoneNumber" onChange={(e,value)=>{this.onInput(e,value)}}/></td>
                    <td><input placeholder="Salary" value="salary" onChange={(e,value)=>{this.onInput(e,value)}}/></td>
                    <td><input placeholder="Department" value="department" onChange={(e,value)=>{this.onInput(e,value)}}/></td>
                    <td><button onClick={this.onSubmit}>Submit</button></td>
                    </th>
                {Object.keys(this.state.data).map((key, i)=>{
                    return <tr key={i}>
                    <td>{this.state.data[key].name}</td>
                    <td>{this.state.data[key].email}</td>
                    <td>{this.state.data[key].dataOfBirth}</td>
                    <td>{this.state.data[key].phoneNumber}</td>
                    <td>{this.state.data[key].salary}</td>
                    <td>{this.state.data[key].department}</td>
                    <td><button onClick={key=>{this.onDelete(key)}}>Delete</button></td>
                    </tr>
                    })}
            </table>
        </div>
    </div>
    );
}
}

export default App;