import './App.css';
import React from 'react';
import axios from 'axios';

 class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
            url:"https://immense-sea-55313.herokuapp.com/employee",
            data:[],
            copyData:[],
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
        axios.get(this.state.url)
        .then(fetchedData=>{
            this.setState({data:fetchedData.data,
            copyData:fetchedData.data})

        })
        .catch(err=>{
            alert("Check your internet, We are unable to load data", err);
        });
    }

    onSearch(e){
        e.preventDefault();
        var temp =e.target.value;
        if(temp!==""){
            this.setState({data:this.state.data.filter(x => !x._id.indexOf(temp))});
        }else{
            this.setState({data:this.state.copyData});
        }
    }

    onInput(e,key){
        e.preventDefault();
        var temp =e.target.value;
        switch(key){
            case 'name': this.setState({submitData:{
                name:temp}});
                break;
            case 'email':
                this.setState({submitData:{
                    name:this.state.submitData.name,
                    email:temp}}); 
                break;
            case 'dateOfBirth': this.setState({submitData:{
                name:this.state.submitData.name,
                email:this.state.submitData.email,
                dateOfBirth:temp.toString()}});
                break;
            case 'phoneNumber':
                this.setState({submitData:{
                    name:this.state.submitData.name,
                    email:this.state.submitData.email,
                    dateOfBirth:this.state.submitData.dateOfBirth,
                    phoneNumber:temp}});
                break;
            case 'salary': this.setState({submitData:{
                name:this.state.submitData.name,
                email:this.state.submitData.email,
                dateOfBirth:this.state.submitData.dateOfBirth,
                phoneNumber:this.state.submitData.phoneNumber,
                salary:temp}});
                break;
            case 'department': this.setState({submitData:{
                name:this.state.submitData.name,
                email:this.state.submitData.email,
                dateOfBirth:this.state.submitData.dateOfBirth,
                phoneNumber:this.state.submitData.phoneNumber,
                salary:this.state.submitData.salary,
                department:temp}});
                break;
            default:
                alert("Please check for your input");         
            }
        }

    onSubmit(){
        var email = /\S+@\S+\.\S+/;
                if (email.test(this.state.submitData.email)){
                    }
                else
                  {
                    return alert("Check your Email");
                }
        var phoneno = /^\d{10}$/;
                if (phoneno.test(this.state.submitData.phoneNumber)){
                }else{
                    return alert("Check your phone number");
                    }                   
        axios.post(this.state.url,this.state.submitData)
        .then(()=>{
            alert("Data submitted!!");
            this.onCall();
        })
        .catch(err=>{
            alert("Check for the data, We got some error!",err)
        });
    }

    onDelete(key){
        axios.delete(this.state.url+"/"+this.state.data[key]._id)
        .then(()=>{
            alert("Data Deleted!!")
            this.onCall();
        })
        .catch(err=>{
            alert("We got some error, please try again in some time!",err)
        });
    }

    render(){
    return ( 
    <div className="App">
        <div className="App-header">
        <h1 >Emplooyees</h1>
        <div className="filter">
        <span>Enter Id to Serach the the Emplooyee</span>
        <input onChange={e=>{this.onSearch(e)}}/>
        </div>
        </div>
        <div className="main-content">
            <table className="table-data">
            <tr className="tabel-header"> 
            <td>Id</td>
            <td>Name</td>
                    <td>Email</td>
                    <td>Date of Birth</td>
                    <td>Phone Number</td>
                    <td>Salary</td>
                    <td>Department</td>
                    <td>Action</td>
                    </tr>
                    <tr className="table-input">
                    <td > </td>
                    <td><input placeholder="Name"  onChange={(e,name="name")=>{this.onInput(e,name)}}/></td>
                    <td><input type="email" placeholder="Email"  onChange={(e,name="email")=>{this.onInput(e,name)}}/></td>
                    <td><input type="date" placeholder="Date of Birth"  onChange={(e,name="dateOfBirth")=>{this.onInput(e,name)}}/></td>
                    <td><input type="number" placeholder="Phone Number"  onChange={(e,name="phoneNumber")=>{this.onInput(e,name)}}/></td>
                    <td><input type="number" placeholder="Salary"  onChange={(e,name="salary")=>{this.onInput(e,name)}}/></td>
                    <td><input placeholder="Department"  onChange={(e,name="department")=>{this.onInput(e,name)}}/></td>
                    <td><button onClick={this.onSubmit}>Submit</button></td>
                    </tr>
                {Object.keys(this.state.data).map((key, i)=>{
                    return <tr key={i} className="data">
                    <td>{this.state.data[key]._id}</td>
                    <td>{this.state.data[key].name}</td>
                    <td>{this.state.data[key].email}</td>
                    <td>{this.state.data[key].dateOfBirth}</td>
                    <td>{this.state.data[key].phoneNumber}</td>
                    <td>{this.state.data[key].salary}</td>
                    <td>{this.state.data[key].department}</td>
                    <td><button onClick={()=>{this.onDelete(key)}}>Delete</button></td>
                    </tr>
                    })}
            </table>
        </div>
    </div>
    );
}
}

export default App;