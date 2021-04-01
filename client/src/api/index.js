import ky from 'ky';
import auth from './auth';

const dbBase = 'http://localhost:8080';

const api = {
  auth: {
    async show(email, password) {
      try {
        if (email && password) {
          const user = await auth.signInWithEmailAndPassword(email, password);
          return user;
        }

        return auth.currentUser;
      } catch (error) {
        throw new Error(error);
      }
    },

    async create(email, password) {
      try {
        const user = await auth.createUserWithEmailAndPassword(email, password);
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },

    update(email) {
      return auth
        .sendPasswordResetEmail(email)
        .then(() => 'Check your email for a link to reset your password.')
        .catch(error => {
          throw new Error(error);
        });
    },

    delete() {
      return auth
        .signOut()
        .then(() => true)
        .catch(error => {
          throw new Error(error);
        });
    },
  },

  db: {
    /**
     * Get all investments for either a user or for everyone if 'admin.'
     * @param {Object} user - user's ✉️
     * @returns {[Object]}
     */
    async index(user) {
      const resp = await ky
        .post(
          `${dbBase}/investments/user`,
          // Send user ✉️ JSON as request body
          { json: user }
        )
        .json();

      return resp;
    },

    async create(investment) {
      const json = await ky
        .post(`${dbBase}/investments/investment`, {
          json: investment,
        })
        .json();

      return json;
    },

    /**
     * 🔥
     * @params {string} investment - name of the investment
     * @returns {Object}
     */
    async delete(investment) {
      const json = await ky
        .delete(`${dbBase}/investments/`, {
          json: { investment },
        })
        .json();

      return json;
    },
  },

  partner: {
    async create(partner, investmentName) {
      const json = await ky
        .post(`${dbBase}/investments/investor`, {
          json: { investment: investmentName, partner },
        })
        .json();

      return json;
    },
  },
};

export default api;
