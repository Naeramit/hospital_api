const  { NlpManager }  = require ('node-nlp')

const manager = new NlpManager();

const drugPrediction = (text) => {
    manager.load("./src/utils/NLP/new_para_model");
    return manager.process('en', text)
}



exports.drugPrediction = drugPrediction ;