import { Component, OnInit } from '@angular/core';
import { FormControl ,FormControlName,FormGroup,Validators} from '@angular/forms';
import CanvasJS from '../../../assets/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'Cricket';
  chart:any;
  clear:boolean = false;
  formValue;
  correctValue;
  Correct:number=0;
  Wrong:number = 0;
  SubmitDisabled:boolean=false;
  form = new FormGroup({
    question1: new FormControl('',Validators.required),
    question2: new FormControl('',Validators.required),
    question3: new FormControl('',Validators.required),
    question4: new FormControl('',[Validators.required,Validators.maxLength(2)])
  });

  Answer_sheet:any = {
    answer1:2011,
    answer2:400,
    answer3:'Australia',
    answer4:49
  }
  constructor() { }

ngOnInit() {
  this.chart = new CanvasJS.Chart("chartContainer", {
    title: {
      text: "Result"
    },
    axisY: {
      title: "Number",
      suffix: ""
    },
    data: [{
      type: "column",	
      yValueFormatString: "",
      indexLabel: "{y}",
      dataPoints: [
        { label: "Correct", y: 0 , color:"#6B8E23" },
        { label: "Incorrect", 	y:0 ,color: "#FF2500" }
      ]
    }]
  });
  this.chart.render();
}   

 updateChart(right,wrong) {
    this.chart.options.data[0].dataPoints[0].y = right; 
    this.chart.options.data[0].dataPoints[1].y = wrong; 
    this.chart.render();
  };

  Submit(){
    this.clear = true;
    this.correctValue = Object.values(this.Answer_sheet);
    this.formValue = Object.values(this.form.value);
    this.formValue.forEach((element,index) => {
      if(element== this.correctValue[index]){
        this.Correct++;
      }else{
        this.Wrong++;
      }
    });
    this.updateChart(this.Correct,this.Wrong);
    this.SubmitDisabled = true;
  }

  cleardata(){
    this.form.setValue({question1:'', question2:'',question3:'',question4:''});
    this.chart.options.data[0].dataPoints[0].y = 0; 
    this.chart.options.data[0].dataPoints[1].y = 0;
    this.chart.render();
    this.clear = false; 
    this.SubmitDisabled = false;
    this.Correct=0;
    this.Wrong = 0;
  }
  isNumber(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
