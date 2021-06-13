const passport = require('passport')
const mongoose = require('mongoose')
const User = mongoose.model('users')
const requireLogin = require('../middleware/requireLogin')

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt:'consent'
    }))
    
    app.get('/auth/google/callback', passport.authenticate('google'), (req, res)=> {
        res.redirect('/')
    })

    app.get('/api/logout', (req, res)=>{
        req.logout()
        res.redirect('/')
    })
    
    app.get('/api/current_user', (req, res)=>{
        res.send(req.user)
    })

    app.get('/api/leaderboard',  async(req, res) => {
        // const users = await User.find({
        //     'solvedQuestion.0' :{"$exists":true} 
        // });
        // console.log('before sort', users)
        // const sortedUser = users.sort(function(a, b) {
        //     var keyA = a.solvedQuestion.length, keyB = b.solvedQuestion.length;
        //     if(keyA > keyB) return -1;
        //     if(keyA < keyB) return 1;
        //     return 0;
        // })
        // console.log('after sort', users)
        // const getObj = sortedUser.find((x) => x.email === req.user.email)
        // const rank = sortedUser.indexOf(getObj) + 1;
        // req.user.rank = rank;
        // const user = await req.user.save()
        // res.json(sortedUser)
        const users = await User.find({}).where('score').gt(0).sort({score:-1})
        console.log('users sorted', users)
        // const getObj = users.find((x) => x.email === req.user.email);
        // const rank = users.indexOf(getObj) + 1;
        // req.user.rank = rank;
        // await req.user.save()
        users.map(async(user) => await User.findByIdAndUpdate({_id:user._id},{$set:{rank : users.indexOf(user) + 1}}))
        res.json(users)
    })

    app.post('/api/update_user', requireLogin, async (req, res) => {
        const { score, problemId } = req.body;

        try {
            if(score === 100 ) {
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = mm + '/' + dd + '/' + yyyy;
                if(!req.user.attemptedQuestions.includes(problemId)){
                    const user = await User.findByIdAndUpdate(req.body.userId, {$push : {attemptedQuestions : problemId}});
                    var updatedUser = await user.save();
                }
                if(!req.user.solvedQuestion.includes(problemId)){
                    const scoreUpdate = await User.findByIdAndUpdate(req.body.userId, {$set : {score : req.user.score + 10}})
                    await scoreUpdate.save()
                    const user = await User.findByIdAndUpdate(req.body.userId, {$push : {solvedQuestion : problemId}})
                    var updatedUser = await user.save();

                    if(req.user.timeSeriesGraphData.findIndex(item => item.key === today) < 0 ){
                        const user = await User.findByIdAndUpdate(req.body.userId, {$push : {timeSeriesGraphData : {
                            key:today,
                            data: 1
                        }}})
                        var updatedUser = await user.save()
                    }else {
    
                        const user = await User.findByIdAndUpdate(req.body.userId, {$set : {timeSeriesGraphData : {
                            key : today,
                            data : req.user.timeSeriesGraphData.map((item, index) => {
                                if(item.key === today){
                                req.user.timeSeriesGraphData[index].data = req.user.timeSeriesGraphData[index].data + 1
                                console.log(req.user.timeSeriesGraphData[index].data)
                                req.user.save()
                                }
                            }
                              
                            )
                        }}})
            
                        var updatedUser = await user.save()
                    }
                    
                    res.status(200).json(updatedUser)
    
                } 

                }
                if(req.user.partiallySolvedQuestion.includes(problemId)){
                    var user = await User.findByIdAndUpdate(req.body.userId, {$pull : {partiallySolvedQuestion : problemId}})
                    var updatedUser = await user.save();
                }



            if(score === 0 ) {
                if(!req.user.attemptedQuestions.includes(problemId)){
                    var user = await User.findByIdAndUpdate(req.body.userId, {$push : {attemptedQuestions : problemId}})
                    var updatedUser = await user.save();
                }
                if(!req.user.partiallySolvedQuestion.includes(problemId) && !req.user.solvedQuestion.includes(problemId)){
                        var user = await User.findByIdAndUpdate(req.body.userId, {$push : {partiallySolvedQuestion : problemId}})
                        var updatedUser = await user.save();             
                }
                res.status(200).json(updatedUser)
            } 

            if(score > 0 && score < 100){
                console.log('half score reached');
                if(!req.user.attemptedQuestions.includes(problemId)){
                    var user = await User.findByIdAndUpdate(req.body.userId, {$push : {attemptedQuestions : problemId}})
                    var updatedUser = await user.save();
                }
                if(!req.user.partiallySolvedQuestion.includes(problemId) && !req.user.solvedQuestion.includes(problemId)){
                    var user = await User.findByIdAndUpdate(req.body.userId, {$push : {partiallySolvedQuestion : problemId}})
                    var updatedUser = await user.save();             
            }
                res.status(200).json(updatedUser)
            }
        }catch(err) {
            res.json(err)
        }
    })
    
}
