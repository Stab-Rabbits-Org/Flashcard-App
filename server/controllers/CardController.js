const router = require('express').Router();
const Deck = require('../models/model');

//show card
router.get('/:deckId/card', async (req, res) => {
  try {
    console.log('entered get deck');
    const deckId = req.params.deckId;
    console.log(deckId);
    const deck = await Deck.findById(deckId);
    if (!deck) {
      return res.status(404).json({ error: 'Could not find deck' });
    }
    console.log(`found deck ${deck.deckName}`);
    res.json(deck);
  } catch (error) {
    console.log('Error finding deck');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//create card
router.post('/:deckId/card', async (req, res) => {
  try {
    const deckId = req.params.deckId;
    const deck = await Deck.findById(deckId);
    console.log(deck);
    const { front, back } = req.body;
    console.log('front', front);
    console.log('back', back);
    if (!deck) {
      return res.status(404).json({ error: 'Could not find deck' });
    }
    console.log('deck cards', deck.cards);
    deck.cards.push({ front, back });
    console.log('after pushing new card', deck.cards);
    await deck.save();
    console.log('created card');
    res.redirect('/');
  } catch (error) {
    console.log('Error creating card');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//delete card
router.delete('/:deckId/card', async (req, res) => {
  try {
    const deckId = req.params.deckId;
    // const deck = await Deck.findById(deckId);
    // console.log('deckID',deckId)
    const { deletedCardID } = req.body;
    console.log('deletedCardID', deletedCardID);
    // console.log('find card?', Deck.findById(deletedCardID))
    // await Deck.findOneAndDelete({_id: deckId, 'cards._id': deletedCardID});

    await Deck.updateOne(
      { _id: deckId },
      { $pull: { cards: { _id: deletedCardID } } }
    );
    // console.log('card',card)
    // if (!card) {
    //   return res.status(404).json({ error: 'Could not find card' });
    // }
    // console.log('deleted card');
    res.redirect('/');
  } catch (error) {
    console.log('Error deleting card');
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//New Added Feature: Edit Card
router.put('/:deckId/card', async (req, res) => {
  try{
    const deckId = req.params.deckId;
    //Mock names - (editCardID, cardNameUpdate) - until correct names are given.
    const{editCardID, cardNameUpdate}  = req.body;
    console.log('Inc Card Edit: ', cardNameUpdate)
    //Have to determine if update request is for Front or Back Side of Card.
    await Deck.findByIdAndUpdate({_id: deckId}, {$set: {front: cardNameUpdate}})
    res.redirect('/');
  } catch (error) {
    console.log('Error editing card');
    res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;
