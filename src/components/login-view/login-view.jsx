export const LoginView = () => {
  retrun(
    <form>
      <label>
        Username:
        <input type="text" />
      </label>
      <label>
        Password:
        <input type="text" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
