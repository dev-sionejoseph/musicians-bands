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
        const katseye = await Band.create({name:"Katseye", genre: "KPop"})
        const bandSplit = await katseye.destroy()
        expect(bandSplit).toBe(katseye);
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const sza = await Musician.create({name:"SZA", instrument: "vocals"})
        const szaQUIT = await sza.destroy()
        expect(szaQUIT).toBe(sza);
    })

    //Associations Tests

    test('One Band has many Musicians', async () => {
        const groupTherapy = await Band.create({name:"GroupTherapy", genre: "HipHop"})
        const swim = await Musician.create({name:"Swim", instrument: "vocals"})
        const tjonline = await Musician.create({name:"TJOnline", instrument: "vocals"})
        const jadaG = await Musician.create({name:"Jada Grace", instrument: "vocals"})
        await groupTherapy.addMusicians([swim,tjonline,jadaG]);
        const membersGT = await groupTherapy.getMusicians()
        
        expect(membersGT.length).toEqual([swim,tjonline,jadaG].length);
        expect(membersGT[0].name).toEqual("Swim");

    })

    test('Many Bands have many Songs', async () => {
        const jayz = await Band.create({name:"JayZ", genre: "HipHop"})
        const linkinPark = await Band.create({name:"Katseye", genre: "Rock"})
        const sharedSongs = await Song.bulkCreate([
            {
                name: "Numb/Encore",
                genre: "Hip Hop / Rock"
            },{
                name: "Izzo/In the End",
                genre: "Hip Hop / Rock"
            }
        ])
        await jayz.addSongs(sharedSongs);
        await linkinPark.addSongs(sharedSongs);
        
        const allSongs = await Song.findAll({ include: Band })

        expect(await allSongs[0].band).toEqual(await allSongs[1].band);

    })
})