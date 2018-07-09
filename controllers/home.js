var web3Module = require ('../ethereum/web3');
var Web3 = require('web3');
var web3= web3Module.web3;
var Models = require('../models');
module.exports ={
    index: function (req, res){
        res.render ('index'); 
    },
   
    login: function (req,res){
        acc=req.params.firstAccount;
        console.log(req.params.firstAccount);
        Models.Patient.findOne({ethAddr: { $regex : acc}},function(err, patient){
            if (err) {
                throw err;
            }
            if (patient){
                console.log('1');
                res.json({msg:'You have been registered as a patient in our system. Login in to the system?',key:1});
            } 
            console.log('2');
            Models.Doctor.findOne({ethAddr: { $regex : acc}},function(err, doctor){
                if (err) {
                    throw err;
                }
                if (doctor){
                    console.log('3');
                    res.json({msg:'You have been registered as a doctor in our system. Login in to the system?',key:2});
                } 
                console.log('4');
                res.json({msg:'You have not yet been registered to our system. Would you like to sign up?',key:3});
            });
        });
    },

    signuppatient: function (req,res){
        console.log (req.params.firstAccount);
        var newPatient = new Models.Patient({ethAddr:req.params.firstAccount});
        // newPatient.save();
        console.log(newPatient);
        var viewModel = {
            patient: req.params.firstAccount
        }
        res.render('registerPatient',viewModel);
        // Models.Patient.findOne({ ethAddr: { $regex :req.params.firstAccount}}, function(err,patient){
        //     if (err){throw err;}
        //     if (patient){
        //         console.log('m here');
        //         viewModel.patient=patient;
        //         console.log (viewModel.patient);
        //         res.render('registerPatient', viewModel);  
        //     }
        //     console.log('m222 here');
        // });
        // res.render('registerPatient');
    },
    signupdr: function (req,res){
        console.log (req.params.firstAccount);
        // var viewModel= 
        res.render('registerDoctor');
    },
    patientfirstform: function(req,res){
        console.log ('username is',req.body.username);
       
    },
    patientsecondform: function(req,res){
        console.log ('name is ', req.body.firstname); 
        console.log ('name is ', req.body.bloodgroup);      
    }


    
};