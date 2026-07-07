# Chat Widget Enhancements

Three additions to the floating AI chat widget, aimed at a more human, supportive experience.

## 1. Welcome message
- The moment the chat panel is opened, the assistant greets the user with a friendly welcome message (instead of an empty "start a conversation" placeholder).
- The welcome message is stored as part of the conversation, so it also appears in the admin chat history.

## 2. Not helpful → contact support
- Every real AI answer shows a lightweight **"Was this helpful?"** row with 👍 / 👎.
- If the user is **not glad** (👎), the assistant apologizes inline and offers a **"Talk to a human"** action.
- That opens a small **Contact support** form: the user leaves an email (and an optional note).
- On send, the **full conversation transcript + the user's email + note** are packaged as a support ticket (logged for the prototype) so the support team can follow up **by email** with more details.
- The user gets a confirmation both as a toast and as an inline message in the chat.

## 3. No activity — proactive check-in
- If the conversation goes quiet (no activity for a short idle period while the panel is open and the assistant is waiting on the user), the assistant proactively asks **"Is there anything else I can help you with?"**
- Fires once per idle period; sending a new message resets the timer. Closing the panel cancels it.

## Notes (prototype)
- Idle timeout is short (~12s) so the behavior is easy to demo.
- "Sending to support" is simulated (transcript + email logged to console + toast); no real email is sent.
- All conversation content, including welcome / idle / support-confirmation messages, is stored on the session so the admin history reflects the full picture.
