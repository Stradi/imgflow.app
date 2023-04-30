export const EmptyEmailMessages = [
  'How are you going to login without an email?',
  "No email, no entry. Sorry, I don't make the rules.",
  'Looks like you forgot to enter your email. Mind trying again?',
  'Hmm, something seems to be missing. Oh right, your email!',
  'Your email address is missing. Did you forget it, or are you just playing hard to get?',
  'I know emails can be boring, but you still need to enter one.',
  "No email, no login. It's like the chicken and the egg, but less philosophical.",
  "This is awkward...it's like meeting someone for the first time and not asking for their phone number.",
];

export const EmailNotFoundMessages = [
  "Hmm, are you sure that email exists? Because we can't seem to find it in our database.",
  "Sorry, we don't have a record of that email. Maybe try a different one?",
  "It's like trying to find a needle in a haystack. Except in this case, we can't find your email in our haystack.",
  "Are you sure you're using the right email? We don't want to start accusing anyone of mistyping.",
  "Sorry, we don't recognize that email. Maybe it's from an alternate universe or something.",
  "Look, we're not saying you're wrong, but we can't seem to find that email in our database.",
  "Hmm, it seems like that email doesn't exist. Maybe you misspelled it or used your time machine to go to the future?",
  "Sorry, we couldn't find that email in our system. It's like trying to find a unicorn in a sea of donkeys.",
  "We're sorry to say that we don't recognize that email. Maybe it's from a parallel universe where you don't exist?",
  "Looks like you're trying to enter a secret club, but we don't have you on the guest list.",
  "Sorry, we can't let you in with that email. It's like trying to use a fake ID at a nightclub.",
];

export const EmailAlreadyExistsMessages = [
  'It looks like that email has already been claimed by someone else. Maybe try inventing a time machine and registering before them next time?',
  "We hate to break it to you, but that email already exists in our system. Maybe try using a different email address, like your cat's email or something.",
  "Sorry, that email address has already been taken. It's like trying to steal someone else's identity, but less fun.",
  "Email already exists. Looks like someone's been scooping up all the good email addresses. Maybe try using something more creative like 'ILovePuppies69@gmail.com'?",
  "Oops, looks like someone already beat you to that email address. Maybe try using your Hogwarts owl's email instead?",
  "Sorry, that email address has already been claimed. It's like trying to reserve a table at a fancy restaurant at the last minute. It's just not going to happen.",
  "Email already exists. It's like trying to park in a crowded parking lot with only one spot left. Someone else already took it.",
  "That email address has already been registered. Maybe try using a more unique email address like 'IWillConquerTheWorld@gmail.com'?",
  "Sorry, that email has already been claimed. It's like trying to join a secret society that already has too many members.",
  "Looks like that email address has already been taken. Maybe try using your childhood imaginary friend's email instead?",
];

export const EmptyPasswordMessages = [
  'Do you expect me to guess your password?',
  'Are you trying to sneak in without a password? Nice try!',
  'Password missing, please insert coffee to continue.',
  "Hey, what's the secret password? Oh wait, you forgot it...",
  'No password, no entry. Sorry, our security team is pretty strict.',
  "You know the password, right? You just forgot to tell us. It's okay, we won't judge.",
  "Sorry, you can't enter without a password. We don't want any strangers lurking around here.",
  "A password is like a key to a secret club. You need one to get in, and we don't see yours anywhere.",
];

export const PasswordMinLengthMessages = [
  'Are you sure this is your password? It should be minimum 8 characters long, just saying...',
  "Short and sweet passwords aren't always the best. This one needs to be at least 8 characters long.",
  'Your password is too short. Try adding some numbers and a unicorn emoji to make it stronger.',
  "That's all? That's your password? Even a cat could guess that one.",
  'Sorry, your password is too short. We need at least 8 characters to keep the hackers away.',
  'Looks like your password is on a diet. You might want to give it some extra characters.',
  'Short passwords are like short jokes...they never really get the job done.',
  'We take password security seriously around here. Your password needs to bulk up a bit.',
  'Your password is like a small fish in a big pond. It needs to grow bigger to survive.',
];

export const WrongPasswordMessages = [
  'Password incorrect. Did someone steal your keyboard and type the wrong password?',
  "We know it's tough to remember passwords, but that one is definitely not right.",
  "Wrong password. You know what they say, 'if at first you don't succeed, try, try again...with the correct password.",
  "Oops, it looks like someone's been practicing their password guessing skills. Unfortunately, they still got it wrong.",
  "You're almost there, but not quite. That password isn't the magic key to the kingdom.",
  'Wrong password, wrong universe. Maybe your password only works in a different dimension?',
  "Sorry, that's not the password we were looking for. Maybe try 'password123' next time?",
  "It's okay, we all make mistakes. Except in this case, your mistake was the wrong password.",
  "Close, but no cigar. That password won't get you past our security guards.",
  "Wrong password. It's like trying to open a safe with a banana instead of the combination.",
];

export const UnknownErrorMessages = [
  "Looks like we hit a snag. Don't worry, we'll get the duct tape and WD-40 out and fix it in no time.",
  "Sorry, something went wrong with our backend. We're working on it, but it might take a while. Maybe go make a cup of tea?",
  "Invalid backend error. It's like trying to send a fax in 2023. It's just not going to work.",
  "It's not you, it's us. Our backend is having a mid-life crisis and needs a little therapy.",
  "Oops, looks like we broke something. Don't worry, we'll blame it on the intern.",
  "Our backend seems to be on vacation. Maybe it's sipping margaritas on a beach somewhere?",
  "Invalid backend error. It's like trying to fit a square peg in a round hole. It's just not going to happen.",
  "Whoops, something broke. We're not sure what, but it's probably the ghost in the machine.",
  "Invalid backend error. It's like trying to make a smoothie with a toaster. It's not going to end well.",
  "Looks like our backend is playing hooky today. Maybe it's at the movies or taking a nap. We'll give it a stern talking to when it gets back.",
];

export type TErrorFields = 'email' | 'password' | 'custom';
export type TErrorTypes = 'required' | 'minLength' | 'invalid' | 'notFound' | 'alreadyExists' | 'default';

export const ErrorToMessageMap = {
  password: {
    required: EmptyPasswordMessages,
    minLength: PasswordMinLengthMessages,
    invalid: WrongPasswordMessages,
    default: UnknownErrorMessages,
  },
  email: {
    required: EmptyEmailMessages,
    notFound: EmailNotFoundMessages,
    alreadyExists: EmailAlreadyExistsMessages,
    default: UnknownErrorMessages,
  },
};

export function getErrorMessage(field: TErrorFields, errorType: TErrorTypes) {
  let arrToSelect = UnknownErrorMessages;
  if (field === 'custom') {
    return arrToSelect[Math.floor(Math.random() * arrToSelect.length)];
  }

  // @ts-ignore
  arrToSelect = ErrorToMessageMap[field][errorType] || ErrorToMessageMap[field]['default'];
  const randomIndex = Math.floor(Math.random() * arrToSelect.length);
  return arrToSelect[randomIndex];
}
