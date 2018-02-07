var UserRepository = require('../../../src/repository/UserRepository');


describe("UserRepository", function() {
    it("should call db.write", function(){
        var mockDb = jasmine.createSpyObj('db', ['get', 'push', 'write']);
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);
        repository.create({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });

        expect(mockDb.push).toHaveBeenCalledWith({
            id : 1,
            firstname: 'John',
            lastname : 'Doe',
            birthday : '2000-01-01'
        });
        expect(mockDb.write).toHaveBeenCalledTimes(1);
    });

    it("should throw exception undefined", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create();
        };

        expect(f).toThrow('User object is undefined')
    });

    it("should throw exception missing information", function(){
        var repository = new UserRepository({});
        var f = function(){
            repository.create({
                'id' : 1
            });
        };

        expect(f).toThrow('User object is missing information')
    });

    it("should get user", function(){
        var repository = new UserRepository({});
        var mockDb = jasmine.createSpyObj('db', ['get','push','write','find','value']);
        
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);

        repository.create({
            id : 1,
            firstname: 'Samy',
            lastname : 'Beaumier',
            birthday : '2018-02-10'
        });

        repository.findOneById(1);

        expect(mockDb.find).toHaveBeenCalledWith({id: 1});
        expect(mockDb.find).toHaveBeenCalledTimes(1);

        expect(mockDb.value).toHaveBeenCalledTimes(1);

    });

    it("should update user", function(){

        var repository = new UserRepository({});
        var mockDb = jasmine.createSpyObj('db', ['get','push','write','find','assign']);
        
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.find.and.returnValue(mockDb);
        mockDb.assign.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);

        repository.create({
            id : 1,
            firstname: 'Samy',
            lastname : 'Beaumier',
            birthday : '2018-02-10'
        });

        repository.update({
            id: 1,
            firstname: 'sam',
            lastname : 'bmr',
            birthday : '2017-02-10'
        });

        expect(mockDb.find).toHaveBeenCalledWith({id: 1});
        expect(mockDb.find).toHaveBeenCalledTimes(1);

        expect(mockDb.assign).toHaveBeenCalledWith({
            id: 1,
            firstname: 'sam',
            lastname : 'bmr',
            birthday : '2017-02-10'
        });
        expect(mockDb.assign).toHaveBeenCalledTimes(1);

        expect(mockDb.write).toHaveBeenCalledTimes(2);

    });

    it("should delete user", function(){

        var repository = new UserRepository({});
        var mockDb = jasmine.createSpyObj('db', ['get','push','write','find','remove']);
        
        mockDb.get.and.returnValue(mockDb);
        mockDb.push.and.returnValue(mockDb);
        mockDb.remove.and.returnValue(mockDb);

        var repository = new UserRepository(mockDb);

        repository.create({
            id : 1,
            firstname: 'Samy',
            lastname : 'Beaumier',
            birthday : '2018-02-10'
        });

        repository.delete(1);

        expect(mockDb.get).toHaveBeenCalledWith('users');
        expect(mockDb.get).toHaveBeenCalledTimes(2);

        expect(mockDb.remove).toHaveBeenCalledWith({id: 1});
        expect(mockDb.remove).toHaveBeenCalledTimes(1);

        expect(mockDb.write).toHaveBeenCalledTimes(2);

    });


});