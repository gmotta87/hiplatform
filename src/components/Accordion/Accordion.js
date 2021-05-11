import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {TreeView} from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import stockList from '../../data';   
import './style.css';

export default function MultiSelectTreeView(content) {

    const [list,setList] = React.useState([]);
    const [checked,setChecked] = React.useState([]);    


    React.useEffect(()=>{               
        
        //altera a formatação da lista de nomes, o campo children não estava no formato de array json
        
        var cleanList = sanitizeData(stockList);
        setList(sanitizeData(cleanList));
        
     },[])
     

     let sanitizeData = (data) => {

        var obj = new Array(data);
         
        if(obj[0]!==undefined){

            var objRoot = new Array(obj[0]);
           
            for (let i = 0; i < objRoot.length; i++) {
               
                let n1 = objRoot[i];
                 
                if(n1!==undefined){
                   
                   n1 = Object.assign([],n1);
                   
                   for (let b = 0; b < n1.length; b++) {

                       var children = Object.assign([],n1[b].children);

                       n1[b].children = children;

                        if(children.length>0){
                           
                            for (let c = 0; c < children.length; c++) {
                                
                                var n2 = Object.assign([],children[c].children);
                                children[c].children = n2;                                
                                if(n2.length>0){

                                    //formatação recursiva de todos subitens "children"
                                    sanitizeData(n2)
                                }                                
                            }
                        }                                                
                    }
                }

                objRoot[i] = n1;
                
            }

          return objRoot;

          }

     }


     const handleChange = (e,id) =>{
        setChecked({[id]:e.target.checked});
     }


     const renderTree = (item,index) => {

        //função recursiva de todos subitens contidos no array 
       
        let randomId = Math.floor(Math.random() * 10000) ;

        return(
        <>
         <TreeItem key={randomId} nodeId={randomId} label={<div className="wrap-chk"><Checkbox onClick={(e)=>handleChange(e,item.name)} checked={checked[item.name]} />{item.name}</div>}>
            {item.children?item.children.map((subItem,i)=>                     
                   <TreeItem key={i} nodeId={randomId*randomId++} label={<div className="wrap-chk"><Checkbox onClick={(e)=>handleChange(e,item.name)}  checked={checked[item.name]} />{subItem.name}</div>}>
                                {subItem.children ? subItem.children.map((child,key)=>renderTree(child,key)) : null}           
                   </TreeItem>           
            ):null}        
        </TreeItem>
        </>
        )             
     }
     
    
      return (
        <>                    
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            className="treeview"
            multiSelect
            >
            {list[0]&&list[0][0].map((item,index)=>renderTree(item,index))}
            
            </TreeView>
        </>
      )
}