const { db } = require('./db');
const { Band, Musician, Song } = require('./index')

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const paramore = await Band.create({name:"Paramore", genre: "Rock"})
        expect(paramore.name).toBe('Paramore');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const frank = await Musician.create({name:"Frank Ocean", instrument: "vocals"})
        expect(frank.instrument).toBe('vocals');
    })

    test('can update a Band', async () => {
        // TODO - test updating a band
        const lilDragon = await Band.create({name:"Little Dragon", genre:"Electronic"})
        const newDragon = await lilDragon.update({genre:"Dance"})
        expect(newDragon.genre).toBe('Dance');
    })

    test('can update a Musician', async () => {
        const masego = await Musician.create({name:"Masego", instrument:"Guitar"})
        const newMasego = await masego.update({instrument:"Saxaphone"})
        expect(newMasego.instrument).toBe('Saxaphone');
    })

    test('can delete a Band', async () => {
        const groupTherapy = await Band.create({name:"GroupTherapy", genre: "HipHop"})
        const bandSplit = await groupTherapy.destroy()
        expect(bandSplit).toBe(groupTherapy);
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const sza = await Musician.create({name:"SZA", instrument: "vocals"})
        const szaQUIT = await sza.destroy()
        expect(szaQUIT).toBe(sza);
    })
})