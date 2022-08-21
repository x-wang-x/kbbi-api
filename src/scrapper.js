const cheerio = require("cheerio");
const host = "https://kbbi.kemdikbud.go.id/"
var axios = require('axios');

async function search(id) {
    try{
        let response = await axios.get(`https://kbbi.kemdikbud.go.id/entri/${id}`);
        let html = await response.data;
        const $ = cheerio.load(html);
        const resultLists = [];
        const total = $("body > div.container.body-content > h2").length
        // $("body > div.container.body-content > h2").next().next().children("li").find('span').remove()
        // console.log($("body > div.container.body-content > h2").next().next().children("li").text())
        resultLists.push({status : 'ok'})
        for(let i = 0; i < total; i++) {
            let kata = $("h2").eq(i).text();
            let arti = [];
            let tags = []
            $("h2").eq(i).next().next().children("li").each((index, el) => {
                // console.log($(el).html())
                let tag = $(el).find('i > span').attr('title');
                $(el).find('i').remove()
                let list = $(el).text();
                arti.push(list+" / "+tag);
            })
            resultLists.push({
                kata,
                arti,
            })
        }
        
        return resultLists
    }
    catch(e){
        return { status : 'error',message : e.code}
    }

}
module.exports = {search};