<?php include 'header.php'?>


<main class="mainAbout">

    <section class="bg_personal min-vh-100 py-5">

        <div class="container">

            <h2 class="fw-bold text-center text-warning mb-3">Book a one-to-one session.</h2>
            <p class="text-center text-white mb-5">Pick the type of session, then choose one day on the calendar</p>


            <div class="row g-4">
                
                <div class="col-md-4">
                    <div class="card h-100 bg-dark text-white" style="border: 1px solid #FFC107">
                        <div class="card-body text-center p-4">
                            <h3 class="text-warning fw-bold">1 Hour</h3>
                            <p>Quick focused session.</p>
                            
                            <button class="btn btn-outline-warning mt-3" data-session="1h">Select</button>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 bg-dark text-white" style="border: 1px solid #FFC107">
                        <div class="card-body text-center p-4">
                            <h3 class="text-warning fw-bold">4 Hour</h3>
                            <p>Deep dive session.</p>
                            
                            <button class="btn btn-outline-warning mt-3" data-session="4h">Select</button>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card h-100 bg-dark text-white" style="border: 1px solid #FFC107">
                        <div class="card-body text-center p-4">
                            <h3 class="text-warning fw-bold">8 Hour</h3>
                            <p>Full day immersion.</p>
                            
                            <button class="btn btn-outline-warning mt-3" data-session="8h">Select</button>
                        </div>
                    </div>
                </div>


            </div>



        </div>


    </section>

</main>


<?php include 'footer.php'?>