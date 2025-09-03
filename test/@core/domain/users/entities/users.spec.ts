import Users from '@domain/users/entities/user';
import UniqueId from '@domain/basic/uniqueId';

describe('Testes de criação de entidade usuarios e validação da mesma',
  () => {
    it('should be able to create a valid User entity', () => {
      const id_profile = UniqueId.unique();
      const user = Users.newUser({
        username: "teste",
        password: "123456",
        email: 'teste@example.com',
        id_profile: id_profile
      })
      expect(user.username).toBe("teste");
      expect(user.password).toBe("123456");
      expect(user.email).toBe("teste@example.com");
      expect(user.id_profile).toBe(id_profile.toString());
      expect(user.id).toBeDefined();
    });
    it('should be able to create a valid User entity with a specific id', () => {
      const id_profile = UniqueId.unique();
      const id_user = UniqueId.unique();
      const user = Users.userWithId({
        username: "teste",
        password: "123456",
        email: 'teste@example.com',
        id_profile: id_profile
      }, id_user.value)
      expect(user.username).toBe("teste");
      expect(user.password).toBe("123456");
      expect(user.email).toBe("teste@example.com");
      expect(user.id_profile).toBe(id_profile.toString());
      expect(user.id).toBeDefined();
      expect(user.id).toBe(id_user.value);
    });
    it('should throw validations errors on creating entity', () => {
      const id_profile = UniqueId.unique();
      const id_user = UniqueId.unique();
      let error = '';
      try {
        const user = Users.userWithId({
          username: "",
          password: "1",
          email: 'teste',
          id_profile: null
        }, id_user.value);
      }catch (e){
        error = e.response.errors
      }
      expect(error).toStrictEqual( {
          "email": [
            "email must be an email",
            ],
           "id_profile": [
             "id_profile must be a UUID",
               "id_profile must be a string",
               "id_profile should not be empty",
             ],
           "password": [
             "password is not strong enough",
             ],
           "username": [
             "username should not be empty",
             ],
      });
    });
  })