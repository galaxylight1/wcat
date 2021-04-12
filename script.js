#!/usr/bin/env node

let cmds = process.argv.slice(2);

const fs = require('fs');

function wcat(cmds)
{
    let options = cmds.filter(function(data) { 
        return data.startsWith("-");
    });

    let files = cmds.filter(function(data) {
        return !data.startsWith("-");
    });

    // Error Handling
    if(files.length == 0)
    {
        console.log("Please specify a file name to read");
        return;
    }

    for(i in files)
    {
        if(!fs.existsSync(files[i]))
        {
            console.log(files[i] + " does not exist");
            return;
        }
    }
    
    // Writing Commands
    if(options.includes("-w"))
    {
        if(options.length != 1 || files.length != 2 || cmds.indexOf("-w") != 1)
        {
            console.log("Command not found");
            return;
        }
        let data1 = fs.readFileSync(files[0], "utf-8");
        fs.writeFileSync(files[1], data1);
        return;
    }
    else if(options.includes("-a"))
    {
        if(options.length != 1 || files.length != 2 || cmds.indexOf("-a") != 1)
        {
            console.log("Command not found");
            return;
        }
        let data1 = fs.readFileSync(files[0], "utf-8");
        let data2 = fs.readFileSync(files[1], "utf-8");

        fs.writeFileSync(files[1], data1 + "\r\n" + data2);
        return;
    }
    else if(options.includes("-ws"))
    {
        if(options.length != 1 || files.length != 2 || cmds.indexOf("-ws") != 1)
        {
            console.log("Command not found");
            return;
        }
        let data1 = fs.readFileSync(files[0], "utf-8");
        let data2 = fs.readFileSync(files[1], "utf-8");
        
        let lines1 = data1.split("\r\n");
        let lines2 = data2.split("\r\n");
        
        let allText = "";
        for(i in lines1)
        {
            allText += lines1[i] + "\r\n";
        }
        for(i in lines2)
        {
            if(lines2[i] != "") allText += lines2[i] + "\r\n";
        }

        fs.writeFileSync(files[1], allText);
        return;
    }

    // Reading Commands
    var count = 1;
    for(i in files)
    {
        let data = fs.readFileSync(files[i], "utf-8");
        
        if(options.includes("-s"))
        {
            let lines = data.split("\r\n");
            for(j in lines)
            {
                if(lines[j] != "")
                {
                    if(options.includes("-n") || options.includes("-b"))
                    {
                        console.log(count + ". " + lines[j]);
                        count++;
                    }
                    else console.log(lines[j]);
                }
            }
        }
        else if( (options.includes("-n") && !options.includes("-b")) || (options.includes("-n") && options.includes("-b") && (options.indexOf("-n") < options.indexOf("-b"))) )
        {
            let lines = data.split("\r\n");
            for(j in lines)
            {
                console.log(count + ". " + lines[j]);
                count++;
            }
        }
        else if(options.includes("-b"))
        {
            let lines = data.split("\r\n");
            for(j in lines)
            {
                if(lines[j] != "")
                {
                    console.log(count + ". " + lines[j]);
                    count++;
                }
                else console.log(lines[j]);
            }
        }
        else
        {
            console.log(data);
        }
    }

}

wcat(cmds);

// -------------------------------------------------------------------------------------------------

// function wcat(cmds)
// {
//     // Filtering
//     let options = cmds.filter(function(data) {
//         return data.startsWith("-");
//     });

//     let files = cmds.filter(function(data) {
//         return !data.startsWith("-");
//     });

//     // File name left empty
//     if(files.length == 0)
//     {
//         console.log("Please specify a file name to read");
//         return;
//     }

//     // File exists or not
//     for(i in files)
//     {
//         if(!fs.existsSync(files[i]))
//         {
//             console.log(files[i] + " does not exist");
//             return;
//         }
//     }
    
//     // Writing commands
//     if(options.includes("-w"))
//     {
//         if(options.length != 1 || files.length != 2 || cmds.indexOf("-w") != 1)
//         {
//             console.log("Command not found")
//             return;
//         }
//         let data = fs.readFileSync(files[0], "utf-8");
//         fs.writeFileSync(files[1], data);
//         return;
//     }
//     else if(options.includes("-a"))
//     {
//         if(options.length != 1 || files.length != 2 || cmds.indexOf("-w") != 1)
//         {
//             console.log("Command not found")
//             return;
//         }
//         let data1 = fs.readFileSync(files[0], "utf-8");
//         let data2 = fs.readFileSync(files[1], "utf-8");

//         fs.writeFileSync(files[1], data1 + "\n" + data2);
//         return;
//     }
//     else if(options.includes("-ws"))
//     {
//         if(options.length != 1 || files.length != 2 || cmds.indexOf("-ws") != 1)
//         {
//             console.log("Command not found");
//             return;
//         }
//         let data1 = fs.readFileSync(files[0], "utf-8");
//         let data2 = fs.readFileSync(files[1], "utf-8");
//         let lines1 = data1.split("\r\n");
//         let lines2 = data2.split("\r\n");

//         let allText = "";
//         for(k in lines1)
//         {
//             if(lines1[k] != "") allText += lines1[k] + "\n";
//         } 
//         for(k in lines2) 
//         {
//             if(lines2[k] != "") allText += lines2[k] + "\n";
//         }

//         fs.writeFileSync(files[1], allText);
//         return;
//     }

//     // Reading commands
//     var count = 1;
//     for(i in files)
//     {   
//         let str = fs.readFileSync(files[i], "utf-8");
        
//         if(options.includes("-s"))
//         {
//             let lines = str.split("\r\n");
//             for(j in lines)
//             {
//                 if(lines[j] != "")
//                 {
//                     if(options.includes("-n"))
//                     {
//                         console.log(count + ". " + lines[j]);
//                         count++;
//                     }
//                     else console.log(lines[j]);
//                 }
//             }
//         }
//         else if((options.includes("-n") && !options.includes("-b")) || (options.includes("-n") && options.includes("-b") && (options.indexOf("-n") < options.indexOf("-b"))))
//         {
//             let lines = str.split("\r\n");
//             for(j in lines)
//             {
//                 console.log(count + ". " + lines[j]);
//                 count++;
//             }
//         }
//         else if(options.includes("-b"))
//         {
//             let lines = str.split("\r\n");
//             for(j in lines)
//             {
//                 if(lines[j] != "")
//                 {
//                     console.log(count + ". " + lines[j]);
//                     count++;
//                 }
//                 else console.log(lines[j]);
//             }
//         }
//         else
//         {
//             console.log(str);
//         }
//     }
// }

// wcat(cmds);

// let cmds = process.argv.slice(2);
// const fs = require('fs');

// function wcat(cmds)
// {
//     let options = cmds.filter(function(data, index) {
//         return data.startsWith("-");
//     });

//     let files = cmds.filter(function(data, index) {
//         return !data.startsWith("-");
//     });

//     if(files.length == 0)
//     {
//         console.log("Please specify a file name to read.");
//         return;
//     }

//     for(i in files)
//     {
//         if(!fs.existsSync(files[i]))
//         {
//             console.log(files[i] + " does not exist");
//             return;
//         }
//     }

//     for(i in files)
//     {
//         let data = fs.readFileSync(files[i], "utf-8");

//         if(options.includes("-s"))
//         {
//             let lines = data.split("\r\n");
//             for(j in lines)
//             {
//                 if(lines[j] != "")
//                 {
//                     console.log(lines[j]);
//                 }
//             }
//         }
//         else
//         {
//             console.log(data);
//         }
//     }
// }

// wcat(cmds);
