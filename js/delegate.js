class Delegate
{
    constructor(){

    }
    Delegate(pMethodName){
        return this[pMethodName].bind(this);
    }
}