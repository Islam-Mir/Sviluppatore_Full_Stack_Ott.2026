<?php include 'header.php' ?>

<main class="mainContact">

    <section class="bg_personal min-vh-100">
        <div class="container" style="padding-top: 80px; padding-bottom: 80px;">

            <div class="row g-5 align-items-stretch">

              
                <div class="col-lg-5">
                    <div class="h-100 p-4 rounded shadow" style="border: 1px solid #FFC107;">
                        <h2 class="fw-bold text-warning mb-4">Contact Me</h2>

                        <p class="lead text-white mb-4">
                            Do you have a project, a landing page or a custom software idea?
                            Send me a message and tell me what you need.
                        </p>

                        <p class="text-white mb-4">
                            I build modern web solutions, responsive interfaces and custom applications.
                        </p>

                        <hr class="text-warning">

                        <div class="mb-4">
                            <h5 class="text-warning">Email</h5>
                            <p class="text-white mb-0">
                                linus_torvalds@linux.com
                            </p>
                        </div>

                        <div class="mb-4">
                            <h5 class="text-warning">GitHub</h5>
                            <a
                                href="http://www.google.it"
                                target="_blank"
                                class="btn btn-outline-warning"
                            >
                                Visit GitHub
                            </a>
                        </div>

                        <div class="mb-4">
                            <h5 class="text-warning">Availability</h5>
                            <p class="text-white mb-0">
                                Freelance, contract work and collaborations.
                            </p>
                        </div>
                    </div>
                </div>

              
                <div class="col-lg-7">
                    <div class="h-100 p-4 rounded shadow" style="border: 1px solid #FFC107;">
                        <h2 class="fw-bold text-warning mb-4">Send a Message</h2>

                        <form action="" method="post">

                            <div class="row">

                                <div class="col-md-6 mb-3">
                                    <label for="name" class="form-label text-white">Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="name"
                                        name="name"
                                        placeholder="Enter your name"
                                        required
                                    >
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label for="email" class="form-label text-white">Email Address</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        required
                                    >
                                </div>

                            </div>

                            <div class="mb-3">
                                <label for="subject" class="form-label text-white">Subject</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="subject"
                                    name="subject"
                                    placeholder="Message subject"
                                    required
                                >
                            </div>

                            <div class="mb-4">
                                <label for="message" class="form-label text-white">Message</label>
                                <textarea
                                    class="form-control"
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder="Write your message"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" class="btn btn-outline-warning">
                                Send Message
                            </button>

                        </form>
                    </div>
                </div>

            </div>

        </div>
    </section>

</main>

<?php include 'footer.php' ?>